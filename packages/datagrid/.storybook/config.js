import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import 'focus-outline-manager';
import '@talend/bootstrap-theme/src/theme/theme.scss';
import { locales as tuiLocales } from '@talend/locales-tui/locales';

const languages = {};
Object.keys(tuiLocales).forEach(key => (languages[key] = key));
addDecorator(withA11y);

configure([require.context('../src', true, /\.stories\.js$/)], module);
