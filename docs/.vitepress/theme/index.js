import DefaultTheme from 'vitepress/theme';
import PackageHeader from './components/PackageHeader.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // Every package page starts with one of these, and they are written by the build rather
        // than by hand, so it is registered once here instead of imported thirty-four times.
        app.component('PackageHeader', PackageHeader);
    },
};
