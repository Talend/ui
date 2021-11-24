import React from 'react';

import { SelectObject } from '../src';

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

const ExampleSelectObject = {
	'default tree': () => (
		<div>
			<SelectObject {...props} />
		</div>
	),
	'tree with preview': () => (
		<div>
			<SelectObject {...props} schema={schema} />
		</div>
	),
	'tree with filter mode set to ALL': () => (
		<div>
			<SelectObject {...props} filterMode={SelectObject.FILTER_MODE.ALL} />
		</div>
	),
};
export default ExampleSelectObject;
