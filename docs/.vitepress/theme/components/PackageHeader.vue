<script setup>
/**
 * What sits at the top of every package page: how to install it, what it needs, and where the
 * code is. A reader who came for one of those should not have to read prose to find it.
 */
const props = defineProps({
    name: { type: String, required: true },
    repo: { type: String, required: true },
    php: { type: String, default: '' },
    description: { type: String, default: '' },
});
</script>

<template>
    <div class="package-header">
        <code class="package-header__install">composer require {{ props.name }}</code>

        <div class="package-header__facts">
            <a
                class="package-header__fact"
                :href="`https://packagist.org/packages/${props.name}`"
                target="_blank"
                rel="noreferrer"
            >Packagist</a>
            <a
                class="package-header__fact"
                :href="`https://github.com/quillstack/${props.repo}`"
                target="_blank"
                rel="noreferrer"
            >Source</a>
            <span v-if="props.php" class="package-header__fact package-header__fact--quiet">
                PHP {{ props.php }}
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
