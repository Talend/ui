import '@talend/bootstrap-theme/src/theme/theme.scss';
import 'focus-outline-manager';
import 'storybook-chroma';
import { load, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import './i18n';

addDecorator(withA11y);

// automatically import all files ending in *.stories.js
load(require.context('../packages/components/stories', true, /\.stories\.js$/), module);
load(require.context('../packages/datagrid/stories', true, /\.stories\.js$/), module);
