// Pages for the Python packages, built from their READMEs the same way the PHP ones are.
//
// A separate script rather than a flag on the other, because almost everything differs: a
// different organisation, a different manifest format, a different install line, and a
// different address. What they share is the rule that nothing here is written by hand — the
// page is the README, so there is one copy of what a package says about itself.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse as parseToml } from 'smol-toml';

import { LANGUAGES } from './packages.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const PYTHON = LANGUAGES.python;
const OUT = resolve(HERE, '../', PYTHON.out);
const BRANCH = 'main';

const url = (name, file) =>
    `https://raw.githubusercontent.com/${PYTHON.org}/${name}/${BRANCH}/${file}`;

async function get(address) {
    const response = await fetch(address);

    if (!response.ok) {
        throw new Error(`${address} answered ${response.status}`);
    }

    return response.text();
}

/**
 * The README, with the parts a page does not need taken out and its links pointed here.
 */
function asPage(readme, pkg) {
    const lines = readme.split('\n');
    const body = [];

    for (const line of lines) {
        // The badges are the repository's business; the page has its own header.
        if (/^\[!\[[^\]]*\]\(/.test(line.trim())) {
            continue;
        }

        // The title is the front matter's.
        if (/^#\s+\S/.test(line) && body.length === 0) {
            continue;
        }

        body.push(line);
    }

    const documented = new Set(PYTHON.packages.map((p) => p.name));

    return body
        .join('\n')
        .trim()
        .replace(
            new RegExp(`https://github\\.com/${PYTHON.org}/([a-z0-9-]+)(?![/\\w.-])`, 'g'),
            (whole, name) => (documented.has(name) ? `${PYTHON.prefix}/${name}` : whole)
        );
}

function page(pkg, meta) {
    const project = meta.project ?? {};
    const description = project.description ?? pkg.blurb;

    return [
        '---',
        `title: ${JSON.stringify(pkg.title)}`,
        `description: ${JSON.stringify(description)}`,
        'editLink: false',
        '---',
        '',
        `# ${pkg.title}`,
        '',
        `<PackageHeader`,
        `    name="${PYTHON.installAs(pkg.name)}"`,
        `    repo="${pkg.name}"`,
        `    org="${PYTHON.org}"`,
        `    language="Python"`,
        `    version=${JSON.stringify(project['requires-python'] ?? '')}`,
        `    description=${JSON.stringify(description)} />`,
        '',
        '',
    ].join('\n');
}

async function one(pkg) {
    const [readme, toml] = await Promise.all([
        get(url(pkg.name, 'README.md')),
        get(url(pkg.name, PYTHON.manifest)),
    ]);

    await writeFile(
        resolve(OUT, `${pkg.name}.md`),
        page(pkg, parseToml(toml)) + asPage(readme, pkg) + '\n',
        'utf8'
    );

    return pkg.name;
}

await mkdir(OUT, { recursive: true });

const results = await Promise.allSettled(PYTHON.packages.map(one));
const failed = results
    .map((r, i) => (r.status === 'rejected' ? `${PYTHON.packages[i].name}: ${r.reason.message}` : null))
    .filter(Boolean);

console.log(`  strony pythonowe: ${results.filter((r) => r.status === 'fulfilled').length} z ${PYTHON.packages.length}`);

if (failed.length) {
    // A page silently missing is a hole in the documentation nobody sees. This is a build.
    console.error('  nieudane:');
    failed.forEach((f) => console.error(`    ${f}`));
    process.exit(1);
}
