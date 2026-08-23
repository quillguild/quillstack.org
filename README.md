# quillstack.org

The documentation site for [Quillstack](https://github.com/quillstack), published at
<https://quillstack.org>.

Built with [VitePress](https://vitepress.dev).

## How it is put together

There is one page per package, and **none of them is written here.** Each is built from that
package's own README, fetched at build time:

```
scripts/packages.js        the list of packages, and which group each belongs to
scripts/build-packages.js  fetches every README and writes docs/packages/<name>.md
scripts/build-index.js     writes docs/packages/index.md from the same list
docs/guide/               the hand-written chapters, which have no README equivalent
```

A README is the documentation people already read on GitHub and on Packagist, and it is the one
this project keeps honest — its examples are run before they are written down. Copying it into a
second place by hand would mean two documents disagreeing within a week.

**So: to change what a package's page says, change that package's README.** The next build picks
it up.

`docs/packages/*.md` is generated and git-ignored; only `docs/packages/index.md` is tracked, and
that is generated too.

## Running it

```shell
npm install
npm run dev
```

`npm run dev` fetches the READMEs first, so the first run needs a network. To build what CI
builds:

```shell
npm run build
npm run preview
```

## Adding a package

Add it to `scripts/packages.js` — the group, the title shown in the sidebar, and one line saying
what it is for. The page, the sidebar entry and the row in the index all follow from that.

## Publishing

Every push to `main` deploys. So does a run once a day, which is what keeps the package pages in
step with their READMEs without anybody pushing here at all.

A release that should appear immediately can ask for a build:

```shell
gh api -X POST repos/quillstack/quillstack.org/dispatches -f event_type=package-updated
```

## License

MIT — see [LICENSE](LICENSE).
