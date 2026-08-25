import { defineConfig } from 'vitepress';
import { GROUPS } from '../../scripts/packages.js';

const packageSidebar = GROUPS.map((group) => ({
    text: group.title,
    collapsed: false,
    items: group.packages.map(([name, title]) => ({ text: title, link: `/packages/${name}` })),
}));

const guideSidebar = [
    {
        text: 'Getting started',
        items: [
            { text: 'What Quillstack is', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Your first route', link: '/guide/routing' },
            { text: 'What goes over the wire', link: '/guide/responses' },
        ],
    },
    {
        text: 'How it works',
        items: [
            { text: 'The life of a request', link: '/guide/request' },
            { text: 'The container', link: '/guide/container' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Testing', link: '/guide/testing' },
        ],
    },
    {
        text: 'Reference',
        items: [
            { text: 'Standards', link: '/guide/standards' },
            { text: 'Versioning', link: '/guide/versioning' },
        ],
    },
];

export default defineConfig({
    title: 'Quillstack',
    description: 'One way to build an API, in the language you work in. Simple to use, strict about what it does.',
    lang: 'en',
    cleanUrls: true,
    lastUpdated: true,
    // A dead link is a broken promise in a documentation site, and cheaper to find here than
    // by a reader. The exception is the address an example tells you to open on your own
    // machine, which is not this site's to reach.
    ignoreDeadLinks: [/^https?:\/\/localhost(:\d+)?/],

    head: [
        // Two of them, because the mark is drawn twice: a dark quill for a light ground and a
        // light one for a dark ground. A browser picks by the theme its own chrome is in, and a
        // browser too old to know about `media` here takes the first and gets the light one.
        ['link', {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/logo-light.svg',
            media: '(prefers-color-scheme: light)',
        }],
        ['link', {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/logo-dark.svg',
            media: '(prefers-color-scheme: dark)',
        }],
        // Opaque, because this one is drawn onto a home screen and cannot rely on what is
        // behind it.
        ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
        ['meta', { name: 'theme-color', content: '#1b7cc0' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'Quillstack' }],
        ['meta', {
            property: 'og:description',
            content: 'One way to build an API, in the language you work in. Simple to use, strict about what it does.',
        }],
    ],

    themeConfig: {
        logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'Quillstack' },
        siteTitle: 'Quillstack',

        nav: [
            // The language is named rather than assumed. Everything under /guide/ and
            // /packages/ is the PHP framework; saying so where a reader can see it is what
            // stops the Python one from arriving as a surprise.
            {
                text: 'PHP',
                items: [
                    { text: 'Guide', link: '/guide/' },
                    { text: 'Packages', link: '/packages/' },
                    { text: 'Packagist', link: 'https://packagist.org/packages/quillstack/' },
                    { text: 'GitHub', link: 'https://github.com/quillstack' },
                ],
            },
            { text: 'Python', link: '/python', activeMatch: '/python' },
            { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
            { text: 'Packages', link: '/packages/', activeMatch: '/packages/' },
        ],

        sidebar: {
            '/guide/': guideSidebar,
            '/packages/': [{ text: 'All packages', link: '/packages/' }, ...packageSidebar],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/quillstack' }],

        search: { provider: 'local' },

        outline: { level: [2, 3], label: 'On this page' },

        editLink: {
            pattern: 'https://github.com/quillstack/quillstack.org/edit/main/docs/:path',
            text: 'Edit this page',
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Quillstack',
        },

        docFooter: { prev: 'Previous', next: 'Next' },
    },

    sitemap: { hostname: 'https://quillstack.org' },
});
