import React from 'react';

import { namespaces as dsNamespaces } from '@talend/locales-design-system/namespaces';
import { namespaces as componentsNamespaces } from '@talend/locales-tui-components/namespaces';
import { namespaces as formsNamespaces } from '@talend/locales-tui-forms/namespaces';

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

const withFormLayout = (story, options) => {
	if (options.kind.includes('Layout')) {
		return story();
	}
	return (
		<div className="container-fluid">
			<div
				className="col-md-offset-1 col-md-10"
				style={{ marginTop: '20px', marginBottom: '20px' }}
			>
				{story()}
			</div>
		</div>
	);
};
export const decorators = [withFormLayout];
