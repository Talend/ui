import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as formsNamespaces } from '@talend/locales-tui-forms/namespaces';
import { withCenteredLayout } from './decorators/withCenteredLayout.decorator';
import { withFormStoryDisplayMode } from './decorators/withFormStoryDisplayMode.decorator';

export const i18n = {
	namespaces: [...dsNamespaces, ...componentsNamespaces, ...formsNamespaces],
	remoteLocalesMap: {
		'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
		'tui-components':
			'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
		'tui-forms': 'https://unpkg.com/@talend/locales-tui-forms/locales/{{lng}}/{{ns}}.json',
	},
};

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};
