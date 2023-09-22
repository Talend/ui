import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { light } from '@talend/storybook-docs/lib/themes';
import '@talend/storybook-docs/dist/managerStyles.min.css';

addons.setConfig({
	theme: create(light),
});
