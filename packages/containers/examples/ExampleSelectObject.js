import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SelectObject } from '../src';

const props = {
	source: 'with.data',
	tree: {
		nameAttr: 'label',
	},
};

const ExampleSelectObject = {
	'default list': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} />
		</div>
	),
	'default tree': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} />
		</div>
	),
	'tree with preview': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} preview="ObjectViewer" />
		</div>
	),
};
export default ExampleSelectObject;
