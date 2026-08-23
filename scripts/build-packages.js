// Builds one page per package, from that package's own README.
//
// The README is the documentation people already read on GitHub and on Packagist, and it is the
// one this project keeps honest — its examples are run before they are written down. Copying it
// into a second place by hand would mean two documents disagreeing within a week, so this
// fetches it instead: rebuild the site and the pages say whatever the packages now say.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL } from './packages.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../docs/packages');
const BRANCH = 'main';

const raw = (name) => `https://raw.githubusercontent.com/quillstack/${name}/${BRANCH}/README.md`;
const composer = (name) => `https://raw.githubusercontent.com/quillstack/${name}/${BRANCH}/composer.json`;

async function get(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${url} answered ${response.status}`);
    }

    return response.text();
}

/**
 * The README, as a page.
 *
 * The badges go: they are a wall of images that says nothing a reader of the documentation came
 * for, and the same information is on the page already. The first heading goes too, because the
 * page has a title of its own. Everything else is left exactly as it was written.
 */
function asPage(readme, pkg, meta) {
    const lines = readme.split('\n');
    const body = [];
    let seenHeading = false;

    for (const line of lines) {
        if (!seenHeading && /^#\s/.test(line)) {
            seenHeading = true;
            continue;
        }

        // A badge line is nothing but linked images, and there is a run of them at the top.
        if (/^\[!\[.+\]\(.+\)\]\(.+\)\s*$/.test(line)) {
            continue;
        }

        body.push(line);
    }

    const documented = new Set(ALL.map((p) => p.name));

    const text = body
        .join('\n')
        // Headings inside a README start at ### to sit under its title; here they sit under the
        // page title instead, so each one moves up a level and the sidebar reads properly.
        .replace(/^####\s/gm, '### ')
        .replace(/^###\s/gm, '## ')
        // A README points at this site for the full documentation. This is that documentation,
        // so the sentence would send a reader to the page they are already reading.
        .replace(/\s*Full\n?\s*documentation:\s*https:\/\/quillstack\.org\/\S+/g, '')
        // A link to another package's repository becomes a link to that package's page: a
        // reader following it wants what it does, not how it is stored.
        .replace(
            /\(https:\/\/github\.com\/quillstack\/([a-z-]+)\)/g,
            (whole, name) => (documented.has(name) ? `(/packages/${name})` : whole)
        )
        // `LICENSE` sits beside the README in the repository and nowhere near this page.
        .replace(
            /\[LICENSE\]\(LICENSE\)/g,
            `[LICENSE](https://github.com/quillstack/${pkg.name}/blob/main/LICENSE)`
        )
        .replace(/^\s+|\s+$/g, '');

    return { text, requires: meta.require ?? {} };
}

function frontMatter(pkg, meta) {
    return [
        '---',
        `title: ${JSON.stringify(pkg.title)}`,
        `description: ${JSON.stringify(meta.description ?? pkg.blurb)}`,
        'editLink: false',
        '---',
        '',
    ].join('\n');
}

function header(pkg, meta) {
    const php = meta.require?.php ?? '';

    return [
        `# ${pkg.title}`,
        '',
        `<PackageHeader`,
        `    name="quillstack/${pkg.name}"`,
        `    repo="${pkg.name}"`,
        `    php=${JSON.stringify(php)}`,
        `    description=${JSON.stringify(meta.description ?? pkg.blurb)} />`,
        '',
        '',
    ].join('\n');
}

async function one(pkg) {
    const [readme, json] = await Promise.all([get(raw(pkg.name)), get(composer(pkg.name))]);
    const meta = JSON.parse(json);
    const { text } = asPage(readme, pkg, meta);

    await writeFile(
        resolve(OUT, `${pkg.name}.md`),
        frontMatter(pkg, meta) + header(pkg, meta) + text + '\n',
        'utf8'
    );

    return { name: pkg.name, bytes: text.length };
}

await mkdir(OUT, { recursive: true });

const results = await Promise.allSettled(ALL.map(one));
const failed = results
    .map((r, i) => (r.status === 'rejected' ? `${ALL[i].name}: ${r.reason.message}` : null))
    .filter(Boolean);

const built = results.filter((r) => r.status === 'fulfilled').length;
console.log(`  strony pakietow: ${built} z ${ALL.length}`);

if (failed.length) {
    // A page silently missing is a hole in the documentation nobody sees. This is a build.
    console.error('  nieudane:');
    failed.forEach((f) => console.error(`    ${f}`));
    process.exit(1);
}
