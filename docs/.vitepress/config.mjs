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
    description: 'A PHP framework as simple to use as it is strict about what it does.',
    lang: 'en',
    cleanUrls: true,
    lastUpdated: true,
    // A dead link is a broken promise in a documentation site, and cheaper to find here than
    // by a reader. The exception is the address an example tells you to open on your own
    // machine, which is not this site's to reach.
    ignoreDeadLinks: [/^https?:\/\/localhost(:\d+)?/],

    head: [
        ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
        ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
        ['meta', { name: 'theme-color', content: '#1b7cc0' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'Quillstack' }],
        ['meta', {
            property: 'og:description',
            content: 'A PHP framework as simple to use as it is strict about what it does.',
        }],
    ],

    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'Quillstack',

        nav: [
            { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
            { text: 'Packages', link: '/packages/', activeMatch: '/packages/' },
            {
                text: 'Links',
                items: [
                    { text: 'GitHub', link: 'https://github.com/quillstack' },
                    { text: 'Packagist', link: 'https://packagist.org/packages/quillstack/' },
                ],
            },
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
