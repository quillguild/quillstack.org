---
title: What Quillstack is
description: The PHP framework — simple to use, strict about what it does.
---

# What Quillstack is

**This is Quillstack for PHP.** The way of working is meant to outlast the language — see
[Quillstack for Python](/python) for what that means and what exists of it so far — but
everything on this page and everything under it is PHP.

Quillstack is a framework for building APIs, made of thirty-six packages that each work on their
own. It was written to answer a question its author kept running into: why does picking a
framework mean picking between one that is pleasant to use and one that is rigorous about how it
is built?

**The whole stack contains no third-party implementations.** The only outside code anywhere in
it is the PSR interfaces — `psr/http-message`, `psr/log`, `psr/container` and the rest, which
are interfaces and nothing else. There is no Symfony component underneath, no Monolog, no
Doctrine. That is not a boast about invented wheels; it is what makes the next part possible.

## What that buys

Because every part is ours, the parts can be made to fit each other rather than to tolerate each
other:

- **An N+1 query is not a mistake to avoid — it cannot be written.** The ORM loads a relation
  for the whole result set at once, so asking a hundred users for their posts is two queries
  whether you thought about it or not.
- **A route says what reaching it requires**, and one middleware enforces it. A controller has
  nothing to remember. A guarded route with no identity provider configured refuses to boot
  rather than quietly letting everyone through.
- **A field reaches the wire because somebody said it may.** Add a column tomorrow and it is not
  in the API today.

## What it does not do

It does not render HTML, and it has no view layer, no asset pipeline and no front-end
integration. It builds APIs. If you want a framework that does everything, this is not it.

It is also young: every package is in its `0.x` line, and the version numbers mean what they
say — see [Versioning](/guide/versioning).

## Where to go next

- [Installation](/guide/installation) — a running application in three commands
- [Your first route](/guide/routing) — how a request finds a controller
- [Packages](/packages/) — all thirty-six, and what each is for
