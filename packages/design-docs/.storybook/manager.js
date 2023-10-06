import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import { light } from '@talend/storybook-docs/lib/themes';
import '@talend/storybook-docs/dist/managerStyles.min.css';
import logo from './logo.svg';

addons.setConfig({
	theme: create({ ...light, brandImage: logo }),
});
