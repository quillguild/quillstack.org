---
title: The container
description: PSR-11, built to be fast, and never required to use a package.
---

# The container

The container is PSR-11 and its stated goal is speed: what a class needs is worked out once by
reflection and remembered, rather than read again on every request.

```php
$container = new Container();
$controller = $container->get(UserController::class);
```

It reads constructors and typed public properties, so a class asks for what it needs by
declaring it:

```php
final class UserController implements ControllerInterface
{
    public function __construct(
        private readonly UserResponse $response,
        private readonly Orm $orm,
    ) {
    }
}
```

## Interfaces

An interface is bound to what should answer to it:

```php
$container = new Container([
    LoggerInterface::class => Logger::class,
    CacheInterface::class => new FileCache($storage, __DIR__ . '/../var/cache'),
]);
```

A class asking for `LoggerInterface` then gets a `Logger`. An application passes these to `App`
along with its route provider — that list *is* the container configuration.

## Nothing requires it

**No package in Quillstack needs a container to be used.** Every one of them can be built by
hand:

```php
$factory = new UriFactory();
$client = new Client();
$serializer = new Serializer();
```

That is a rule rather than an accident. A component that cannot be constructed without first
reading another component's documentation is not a simple component, whatever its own
documentation says.

More: [Container](/packages/di).
