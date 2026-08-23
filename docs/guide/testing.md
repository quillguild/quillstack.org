---
title: Testing
description: The test runner this framework is built with, which is also the one it ships.
---

# Testing

```shell
composer test
```

Tests are plain classes. A method is a test; what it is called is what it claims, and the runner
reads that back to you when it fails:

```php
class TestUser
{
    public function __construct(private AssertEqual $assertEqual)
    {
    }

    public function withoutATokenItIsRefused()
    {
        $this->assertEqual->equal(401, $this->ask()->getStatusCode());
    }
}
```

There is no configuration file, no annotations and no attributes. The assertions arrive through
the constructor, from the same container the application uses.

## Testing over HTTP

An application is a function from a request to a response, so a test builds the request and
looks at what comes back — no server, no HTTP:

```php
$_SERVER = [
    'REQUEST_METHOD' => 'GET',
    'HTTP_HOST' => 'localhost',
    'REQUEST_URI' => '/users/1',
    'SERVER_PROTOCOL' => '1.1',
];

$response = (new App('', $config))->run();
```

## Coverage

```shell
composer test:coverage
```

Coverage runs under `phpdbg`, which every PHP build ships, so there is no extension to install.

More: [Unit tests](/packages/unit-tests), [Test coverage](/packages/test-coverage),
[Benchmark](/packages/benchmark).
