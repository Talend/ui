import React from 'react';
import { IconsProvider } from 'react-talend-components';
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


export default function ExampleObjectViewer() {
	return (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} />
		</div>
	);
	/*
	.addWithInfo('list default', () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="list" />
		</div>
	))
	.addWithInfo('table default', () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="table" />
		</div>
	))
	.addWithInfo('flat default', () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="flat" />
		</div>
	));*/
}
