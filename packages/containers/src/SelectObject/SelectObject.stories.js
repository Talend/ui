import React from 'react';

import SelectObject from '.';

const props = {
	id: 'example',
	source: 'with.data',
	nameAttr: 'label',
	tree: {},
};

const schema = {
	jsonSchema: {
		title: 'Demo',
		type: 'object',
		properties: {
			label: {
				type: 'string',
				title: 'Label',
			},
			id: {
				type: 'integer',
				title: 'ID',
			},
			author: {
				type: 'string',
				title: 'Author',
			},
			created: {
				type: 'string',
				title: 'Created',
			},
		},
	},
	uiSchema: {
		'ui:order': ['label', 'id', 'author', 'created'],
	},
};

export default {
	title: 'SelectObject',
};

export const Default = () => <SelectObject {...props} />;
export const WithPreview = () => <SelectObject {...props} schema={schema} />;
export const WithFilterModeSetToALL = () => (
	<SelectObject {...props} filterMode={SelectObject.FILTER_MODE.ALL} />
);
