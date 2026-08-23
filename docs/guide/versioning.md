---
title: Versioning
description: What the version numbers mean while everything is still 0.x.
---

# Versioning

Every package is in its `0.x` line. Under Composer's rules for `0.x`, the *minor* is the
breaking position: `^0.6` accepts `0.6.1` and `0.6.9` but never `0.7.0`.

So in this project:

- **`0.6.0` → `0.6.1`** — a fix or an addition. Safe.
- **`0.6.x` → `0.7.0`** — something changed that could break you.

## Constraints

Packages depend on each other with a minor constraint and a floor:

```json
"quillstack/uri": "^0.6.4"
```

That accepts every later patch and refuses the next minor. Raising the floor — `^0.6` becoming
`^0.6.4` because a fix is needed — is not a breaking change and does not cascade.

## Tags do not move

**A published tag is never moved.** Packagist caches the first archive it reads for a tag, so
moving one leaves the registry serving the old code under the new number for as long as its
cache lasts — and nobody can tell which they have. A mistake in a release is fixed by another
release.

## Getting to 1.0

`1.0` is not a date, it is a promise: that the interfaces have been used in anger by somebody
other than their author and did not need changing. Until then the `0.x` line says honestly that
they might.
