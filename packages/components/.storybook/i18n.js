import { namespaces as tuiNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';

export const namespaces = [...tuiNamespaces, ...dsNamespaces];
export const remoteLocalesMap = {
	'tui-components': 'https://unpkg.com/@talend/locales-tui-components/locales/{{lng}}/{{ns}}.json',
	'design-system': 'https://unpkg.com/@talend/locales-design-system/locales/{{lng}}/{{ns}}.json',
};
