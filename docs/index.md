---
layout: home

hero:
  name: Quillstack
  text: A PHP framework that stays out of the way
  tagline: As simple to use as Laravel, as strict about its code as Symfony. Standards first — the only third-party code in the whole stack is the PSR interfaces themselves.
  actions:
    - theme: brand
      text: Get started
      link: /guide/
    - theme: alt
      text: Browse the packages
      link: /packages/
    - theme: alt
      text: GitHub
      link: https://github.com/quillstack

features:
  - title: Nothing you did not ask for
    details: Thirty-four packages, each usable on its own and none of them requiring the rest. Take the router without the ORM, or the HTTP client without any of it.
  - title: Standards, not conventions
    details: PSR-3, 7, 11, 14, 15, 16, 17, 18 and 20, and PSR-1, 4 and 12 throughout. A response is a PSR-7 response, so anything that speaks PSR-7 speaks to it — including the parts you write yourself.
  - title: Impossible rather than discouraged
    details: The ORM batches relations by result set, so an N+1 query is not a mistake to avoid but a thing that cannot be written. A field reaches the wire because somebody said it may.
  - title: Told, not guessed
    details: A route says it needs authentication and one middleware enforces it. A guarded route with nobody to enforce it refuses to boot rather than quietly letting everyone through.
---
