---
title: Standards
description: Which PSRs Quillstack implements, and which package implements each.
---

# Standards

Standards are the reason the stack contains no third-party implementations and still works with
everybody else's code. A response here is a PSR-7 response, so anything that speaks PSR-7 speaks
to it — including the parts you write yourself, and including whatever you would rather use
instead of the package it came from.

## Implemented

| Standard | What it covers | Packages |
| --- | --- | --- |
| [PSR-3](https://www.php-fig.org/psr/psr-3/) | Logger | [logger](/packages/logger), [queue](/packages/queue), [framework](/packages/framework) |
| [PSR-7](https://www.php-fig.org/psr/psr-7/) | HTTP messages | [uri](/packages/uri), [stream](/packages/stream), [header-bag](/packages/header-bag), [server-request](/packages/server-request), [response](/packages/response), [router](/packages/router), [http-client](/packages/http-client), [auth](/packages/auth) |
| [PSR-11](https://www.php-fig.org/psr/psr-11/) | Container | [di](/packages/di), [middleware](/packages/middleware), [cli](/packages/cli), [queue](/packages/queue) |
| [PSR-14](https://www.php-fig.org/psr/psr-14/) | Event dispatcher | [events](/packages/events) |
| [PSR-15](https://www.php-fig.org/psr/psr-15/) | HTTP handlers and middleware | [middleware](/packages/middleware), [auth](/packages/auth), [framework](/packages/framework) |
| [PSR-16](https://www.php-fig.org/psr/psr-16/) | Simple cache | [cache](/packages/cache), [framework](/packages/framework) |
| [PSR-17](https://www.php-fig.org/psr/psr-17/) | HTTP factories | [uri](/packages/uri), [response](/packages/response), [server-request](/packages/server-request), [http-client](/packages/http-client) |
| [PSR-18](https://www.php-fig.org/psr/psr-18/) | HTTP client | [http-client](/packages/http-client) |
| [PSR-20](https://www.php-fig.org/psr/psr-20/) | Clock | [clock](/packages/clock), [cache](/packages/cache), [queue](/packages/queue) |

PSR-1 and PSR-12 are followed throughout, checked by StyleCI on every push. PSR-4 is how every
package autoloads.

## Not implemented

**PSR-6** (caching interfaces) is not implemented anywhere. The cache is PSR-16 only, which is
the simpler of the two and the one an application usually wants; if you need PSR-6, wrap it.

## What that is worth

Every package here can be swapped for somebody else's implementation of the same standard, and
every package here can be dropped into somebody else's application. That is the point of
building on interfaces rather than on a framework: **nothing in this stack is load-bearing
because it is ours.**
