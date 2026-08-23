---
title: What goes over the wire
description: Responses that carry an object, and the field that is never sent by accident.
---

# What goes over the wire

A response can be written out by hand:

```php
final class HomeResponse extends Response
{
    public function send(): array
    {
        return ['app' => 'The Quillstack Framework', 'version' => $this->version];
    }
}
```

That is fine for a fixed payload. It is a poor way to send an entity, because the list of fields
is in a second place: rename a property and the response still compiles, still answers, and
quietly stops carrying it. Add a column and nobody notices it is missing from the API until
somebody asks.

## Carry the object instead

```php
use Quillstack\Framework\Http\Responses\SerializedResponse;

final class UserResponse extends SerializedResponse
{
}
```

That is the whole class. What may go over the wire is said on the entity, beside the field it
belongs to:

```php
#[Table('users')]
final class User
{
    public function __construct(
        #[Id, Exposed] public ?int $id = null,
        #[Column(unique: true), Exposed] public string $email = '',
        #[Column] public string $password = '',
    ) {
    }
}
```

```php
return $this->response->with($user);
```

```json
{"id": 1, "email": "ada@example.com"}
```

`password` is not there, and **will not be there the day somebody adds a column beside it**. A
serializer that sends everything except a list of exclusions sends each new column on the day it
is added, and says nothing about it.

## Audiences

A response for particular readers names its groups and gets the fields marked for them, without
anything else in the application knowing which those are:

```php
final class AdminUserResponse extends SerializedResponse
{
    protected function groups(): array
    {
        return ['admin'];
    }
}
```

```php
#[Column, Exposed(groups: ['admin'])] public string $note = '',
```

## A list of them

`with()` takes one object or many:

```php
return $this->response->with($users);
```

More: [Serializer](/packages/serializer), [Response](/packages/response).
