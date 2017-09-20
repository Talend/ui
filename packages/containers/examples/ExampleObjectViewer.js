import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ObjectViewer } from '../src';

const data = [
	{
		int: 1,
		str: 'test data for the object viewer',
		bool: true,
		obj: {
			bool: true,
		},
		arrayInt: [
			1, 2, 3, 4,
		],
		arrayOb: [
			{ foo: 'bar' },
		],
	},
	{
		int: 2,
		str: 'hello world',
		bool: false,
		obj: {
			bool: false,
		},
		arrayOb: [
			{ foo: 3.2 },
		],
	},
];


const ExampleObjectViewer = {
	default: () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} />
		</div>
	),
	'list default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="list" />
		</div>
	),
	'table default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="table" />
		</div>
	),
	'flat default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="flat" />
		</div>
	),
};
export default ExampleObjectViewer;
