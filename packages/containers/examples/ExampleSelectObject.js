import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SelectObject } from '../src';

const props = {
	id: 'example',
	source: 'with.data',
	nameAttr: 'label',
	tree: {},
};

const ExampleSelectObject = {
	'default tree': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} />
		</div>
	),
	'tree with ObjectViewer as Preview': () => (
		<div>
			<IconsProvider />
			<SelectObject {...props} preview="ObjectViewer" />
		</div>
	),
};
export default ExampleSelectObject;
