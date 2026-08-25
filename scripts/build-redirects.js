// Keeps the addresses this site used to have.
//
// Every released package on Packagist carries `https://quillstack.org/<name>` in its metadata,
// and a released package cannot be changed. Those addresses have to keep working for as long as
// anybody can install a version that names them, which is for ever.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL, WITHDRAWN } from './packages.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../docs/public');

const page = (name, title) => `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>${title} — Quillstack</title>
    <link rel="canonical" href="https://quillstack.org/packages/${name}">
    <meta http-equiv="refresh" content="0; url=/packages/${name}">
    <meta name="robots" content="noindex">
</head>
<body>
    <p>This page moved to <a href="/packages/${name}">/packages/${name}</a>.</p>
    <script>location.replace('/packages/${name}' + location.hash);</script>
</body>
</html>
`;

// Withdrawn packages included. query-builder turned out to be gone from Packagist as well, so
// nobody can install a version carrying this address any more — but the address is still in
// old READMEs, in search results, and in whatever anybody wrote down, and answering it costs a
// file. Where a package is only repo-deleted and stays published, this is not optional.
for (const pkg of [...ALL, ...WITHDRAWN]) {
    const dir = resolve(OUT, pkg.name);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, 'index.html'), page(pkg.name, pkg.title), 'utf8');
}

console.log(`  przekierowania ze starych adresow: ${ALL.length + WITHDRAWN.length}`);
