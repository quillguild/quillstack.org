// The package index, written from the same list the sidebar is built from, so a package cannot
// appear in one and be missing from the other.
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GROUPS, ALL } from './packages.js';

const HERE = dirname(fileURLToPath(import.meta.url));

const sections = GROUPS.map((group) => {
    const rows = group.packages
        .map(([name, title, blurb]) =>
            `| [${title}](/packages/${name}) | \`quillstack/${name}\` | ${blurb} |`)
        .join('\n');

    return [
        `## ${group.title}`,
        '',
        group.blurb,
        '',
        '| Package | Install as | What it does |',
        '| --- | --- | --- |',
        rows,
        '',
    ].join('\n');
}).join('\n');

const page = [
    '---',
    'title: Packages',
    'description: Every package in Quillstack, and what each one is for.',
    'editLink: false',
    '---',
    '',
    '# Packages',
    '',
    `Quillstack is ${ALL.length} packages. Each is released on its own, each can be installed on`,
    'its own, and none of them needs the others to be useful — the framework is what happens when',
    'you take all of them at once.',
    '',
    'Every page here is built from that package\'s own README, so what you read is what ships.',
    '',
    sections,
].join('\n');

await writeFile(resolve(HERE, '../docs/packages/index.md'), page, 'utf8');
console.log(`  indeks pakietow: ${ALL.length} pozycji`);
