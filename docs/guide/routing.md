---
title: Your first route
description: How a request finds a controller, and what the controller gets.
---

# Your first route

Routes are registered in one place, by a provider:

```php
use Quillstack\Framework\Interfaces\RouteProviderInterface;
use Quillstack\Router\Router;

final class RouteProvider implements RouteProviderInterface
{
    public function setRoutes(Router $router): void
    {
        $router->get('/', HomeController::class)->name('home');
        $router->get('/users/:id', UserController::class)->name('users.show');
        $router->delete('/users/{id}', DeleteUserController::class);
    }
}
```

`get()`, `post()`, `put()`, `patch()`, `delete()`, `options()` and `head()` register a single
method. `match(['PUT', 'PATCH'], …)` registers several, and `any()` registers them all.

## Parameters

A segment written `:id` or `{id}` is a parameter. What matched is put on the request as an
attribute, and a query string never takes part in the matching:

```php
use Psr\Http\Message\ServerRequestInterface;
use Quillstack\Framework\Interfaces\ControllerInterface;

final class UserController implements ControllerInterface
{
    public function __construct(private readonly UserResponse $response)
    {
    }

    public function handle(ServerRequestInterface $request): UserResponse
    {
        $id = $request->getAttribute('id');

        // An attribute is whatever was put there, so it is worth asking what it is
        // before using it.
        if (!is_string($id)) {
            throw new NotFoundHttpException('No such user');
        }

        return $this->response->with($this->users->find((int) $id));
    }
}
```

The controller is asked for by name, so the container builds it with whatever its constructor
declares — see [The container](/guide/container).

## When nothing matches

A path nobody registered is answered `404`. A path registered for a different method is
answered `405`, and the response names the methods that path does answer to — the difference
between *there is no such thing* and *not that way*.

`HEAD` is answered by whatever answers `GET`, with the headers and no body, unless a `head()`
route was registered for it.

## Errors

Nothing thrown by the application reaches the client as a fatal error. An HTTP exception is
answered with the status it carries:

```php
use Quillstack\Framework\Exceptions\Http\NotFoundHttpException;

throw new NotFoundHttpException('No user with that id');
```

Anything else is a `500`, logged in full and described to the client only as far as the
environment allows.

More: [Router](/packages/router), [Middleware](/packages/middleware).
