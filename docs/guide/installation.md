---
title: Installation
description: A running Quillstack application in three commands.
---

# Installation

## Requirements

PHP 8.1 or newer. Nothing else is required to start — the skeleton uses a SQLite file for its
database, so there is no server to install before the first request works.

## Start from the skeleton

```shell
composer create-project quillstack/quillstack my-api
cd my-api
composer serve
```

`create-project` copies `.env.example` to `.env` for you. Cloning the repository by hand instead
means doing that yourself:

```shell
composer install
cp .env.example .env
composer serve
```

The application is then served at `http://localhost:8000`:

```shell
$ curl http://localhost:8000/
{"app":"The Quillstack Framework","version":"1.0.0"}
```

## Add it to an existing project

```shell
composer require quillstack/framework
```

`App` takes the path to the `.env` file and the container configuration, and gives back a PSR-7
response:

```php
use App\Providers\RouteProvider;
use Quillstack\Framework\App;
use Quillstack\Framework\Interfaces\RouteProviderInterface;

require __DIR__ . '/../vendor/autoload.php';

$app = new App(__DIR__ . '/../.env', [
    RouteProviderInterface::class => RouteProvider::class,
]);

echo json_encode($app->run());
```

## Take one package instead

Nothing here is all-or-nothing. Every package installs and works alone, and a package's page
says what it needs:

```shell
composer require quillstack/router
composer require quillstack/http-client
composer require quillstack/orm
```

See [all thirty-six](/packages/).
