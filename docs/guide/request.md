---
title: The life of a request
description: What happens between the request arriving and the response going back.
---

# The life of a request

A request arrives, passes through a stack of middleware, reaches a controller, and the response
travels back out through the same stack in reverse. That is the whole of it — there is no event
system between the layers, and nothing runs that the application did not list.

## The stack

Middleware is PSR-15. The list is applied so that the first entry is the outermost: it sees the
request first and the response last.

The default stack, outermost first:

1. **Error handling** — so anything thrown deeper becomes a response instead of a fatal error
2. **Authentication** — added only when the application has said who anybody is
3. **Routing** — matches the request and calls the controller

Authentication sits inside error handling and outside routing on purpose: a refusal is still a
response and must be shaped like one, and nothing should reach a controller unidentified.

## Adding your own

```php
$app = new App($env, [
    CorsMiddleware::class => new CorsMiddleware(
        origins: ['https://quillstack.com'],
        credentials: true,
    ),
], [
    CorsMiddleware::class,
]);
```

`CorsMiddleware` answers what a browser asks before it will let a page read an API on another
host; a preflight is answered there and never reaches the application.

`RateLimitMiddleware` counts what one caller asks for and refuses the rest once there has been
enough of it. The count lives in a PSR-16 cache, so it is shared by however many processes are
answering:

```php
RateLimitMiddleware::class => new RateLimitMiddleware($cache, limit: 60, window: 60),
```

Past the limit a request is answered `429`, with `X-RateLimit-Limit` and `X-RateLimit-Remaining`
saying where the caller stands.

## Providers

A provider brings a piece of an application with it. Everything registers before anything boots,
so a provider can rely on the services of the ones listed after it:

```php
final class CacheProvider extends ServiceProvider
{
    public function register(): array
    {
        return [
            CacheInterface::class => new FileCache(new LocalStorage(), __DIR__ . '/../var/cache'),
        ];
    }

    public function boot(ContainerInterface $container): void
    {
        $container->get(ListenerProvider::class)->listen(
            UserRegistered::class,
            fn () => $container->get(CacheInterface::class)->delete('users.count')
        );
    }
}
```

What the application configured itself wins, so a provider brings defaults rather than
decisions.

More: [Middleware](/packages/middleware), [Events](/packages/events).
