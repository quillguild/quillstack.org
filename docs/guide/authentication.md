---
title: Authentication
description: A route says what reaching it requires, and one place enforces it.
---

# Authentication

A route says what reaching it requires:

```php
$router->get('/orders', OrdersController::class)->requireAuthentication();
$router->delete('/orders/:id', DeleteOrderController::class)->requireAuthentication('admin');
```

One middleware enforces it, and the controller has nothing to remember. **A rule kept in each
controller instead is a rule which is one day not kept.**

## Who anybody is

The application answers that, because only it knows where its tokens live:

```php
use Quillstack\Auth\IdentityProviderInterface;

$app = new App(__DIR__ . '/../.env', [
    IdentityProviderInterface::class => Users::class,
]);
```

That is the one class an application writes to have authentication at all:

```php
final class Users implements IdentityProviderInterface
{
    public function findByToken(string $token): ?Identity
    {
        $tokens = $this->orm->repository(ApiToken::class);

        // What is looked up is the hash, because that is what was stored.
        $found = $tokens->one(
            $tokens->query()->where('hash', '=', Token::hash($token))
        );

        return $found === null || $found->userId === null
            ? null
            : new Identity($found->userId, $found->roles());
    }
}
```

What is kept is the hash of the token, never the token, so a database somebody reads holds
nothing they could sign in with.

## What callers see

A request from nobody is answered `401`. One from somebody without the role is answered `403`.
A token nobody knows gets the same `401` as no token at all — saying which of the two it was
would tell whoever is guessing that they are close.

Inside a controller:

```php
use Quillstack\Auth\Middleware\AuthenticationMiddleware;

$identity = AuthenticationMiddleware::identityOf($request);
```

## The part that refuses to start

**A guarded route in an application that has said nothing about identities is refused at boot**,
before a single request is served. Such a route would be wide open while reading as guarded,
which is the one failure the whole arrangement exists to prevent.

More: [Authentication](/packages/auth).
