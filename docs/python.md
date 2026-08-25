---
title: Quillstack for Python
description: What exists today, and what does not.
---

# Quillstack for Python

**There is nothing to install yet.** This page says what is actually true today rather than
what is planned, because a documentation site that describes software which does not exist is
worse than one that says so.

## What Quillstack is, before the language

Quillstack is a way of building APIs: a set of small packages that each work alone, a strict
line about what may reach the wire, and a shape every package takes — the same README sections,
the same badges, the same release discipline, the same refusal to guess where something was not
declared.

None of that is about PHP. It happens to have been written in PHP first.

## What already exists for Python

Two packages, and the part that is language-neutral they were written to prove:

- **[quillstack-standards](/python/packages/standards)** — the checker, on PyPI. It reads the
  same `rules.json` the PHP one reads, and both run the same conformance cases, so a rule cannot
  mean one thing in one language and something else in the other.
- **[quillstack-dotenv](/python/packages/dotenv)** — a `.env` file with the types kept and
  nothing expanded, which is the same decision
  [quillstack/dotenv](/packages/dotenv) makes in PHP. The first package written with the checker
  already standing: it passed the standard before its first commit, rather than being brought up
  to it later.

- **[quillstack/standards](https://github.com/quillstack/standards)** holds the shape a package
  takes as data rather than as prose. Seven of its nine rule sections are marked as belonging to
  no language in particular — the README, the badges, the repository metadata, the CI, the
  documentation page, the quality gates and the release discipline. Only two sections name an
  ecosystem, and one of those is a placeholder waiting for this.
- **[github.com/quillstack-py](https://github.com/quillstack-py)** is where the packages will
  live. Separate from the PHP organisation on purpose: one repository cannot carry two
  independent version lines, and putting Python under a suffixed name in the PHP organisation
  would quietly make one of them the guest.

## What does not exist

Everything else. There is no framework, no skeleton, no router, no ORM. A checker and a `.env`
reader are not a framework, and nothing on this site claims otherwise.

## Why it is being done tool-first

The PHP side was built packages-first, and the checker arrived after them. Bringing thirty-six
packages up to a standard written later cost a great deal of retrofitting: READMEs rewritten,
fifteen stale branch aliases, quality gates that had never been computed, and once a Polish word
in an English document.

The Python side starts with the checker understanding `pyproject.toml`, so each package is born
compliant instead of being corrected later.

## In the meantime

[The PHP framework](/guide/) is what Quillstack is today, and it is what the Python one will be
measured against.
