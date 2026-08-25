<script setup>
/**
 * What sits at the top of every package page: how to install it, what it needs, and where the
 * code is. A reader who came for one of those should not have to read prose to find it.
 */
const props = defineProps({
    name: { type: String, required: true },
    repo: { type: String, required: true },
    // Which language this package is written in, and so which registry it comes from and what
    // its version constraint is about. The default is PHP because that is what every package
    // was until there were two.
    language: { type: String, default: 'PHP' },
    org: { type: String, default: 'quillstack' },
    version: { type: String, default: '' },
    php: { type: String, default: '' },
    description: { type: String, default: '' },
});

const python = props.language === 'Python';
const install = python ? `pip install ${props.name}` : `composer require ${props.name}`;
const registry = python
    ? { name: 'PyPI', url: `https://pypi.org/project/${props.name}/` }
    : { name: 'Packagist', url: `https://packagist.org/packages/${props.name}` };
const requires = props.version || props.php;
</script>

<template>
    <div class="package-header">
        <code class="package-header__install">{{ install }}</code>

        <div class="package-header__facts">
            <a
                class="package-header__fact"
                :href="registry.url"
                target="_blank"
                rel="noreferrer"
            >{{ registry.name }}</a>
            <a
                class="package-header__fact"
                :href="`https://github.com/${props.org}/${props.repo}`"
                target="_blank"
                rel="noreferrer"
            >Source</a>
            <span v-if="requires" class="package-header__fact package-header__fact--quiet">
                {{ props.language }} {{ requires }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.package-header {
    margin: 1.5rem 0 2.5rem;
    padding: 1.15rem 1.25rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 10px;
    background-color: var(--vp-c-bg-soft);
}

.package-header__install {
    display: block;
    overflow-x: auto;
    padding: 0;
    background: none;
    color: var(--vp-c-text-1);
    font-family: var(--vp-font-family-mono);
    font-size: 0.9rem;
    white-space: nowrap;
}

.package-header__facts {
    display: flex;
    flex-wrap: wrap;
    gap: 1.1rem;
    margin-top: 0.9rem;
    font-size: 0.8125rem;
}

.package-header__fact {
    color: var(--vp-c-brand-1);
    font-weight: 500;
    text-decoration: none;
}

.package-header__fact:hover {
    text-decoration: underline;
}

.package-header__fact--quiet {
    color: var(--vp-c-text-3);
    font-weight: 400;
}
</style>
