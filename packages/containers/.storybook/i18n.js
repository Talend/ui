import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as formsNamespaces } from '@talend/locales-tui-forms/namespaces';
import { namespaces as containersNamespaces } from '@talend/locales-tui-containers/namespaces';

export const namespaces = [componentsNamespaces, containersNamespaces, formsNamespaces];
export const remoteLocalesMap = {
	'tui-components': 'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
	'tui-containers': 'https://unpkg.com/@talend/locales-tui-containers/locales/{{lng}}/{{ns}}.json',
	'tui-forms': 'https://unpkg.com/@talend/locales-tui-forms/locales/{{lng}}/{{ns}}.json',
};
