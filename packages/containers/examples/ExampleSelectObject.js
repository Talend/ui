import React from 'react';
import { IconsProvider } from '@talend/react-components';
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
};

const ExampleSelectObject = {
	'default tree': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} />
		</div>
	),
	'tree with preview': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} schema={schema} />
		</div>
	),
};
export default ExampleSelectObject;
