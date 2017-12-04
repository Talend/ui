import React from 'react';
import { IconsProvider } from '@talend/react-components';
import {
	// eslint-disbale-line import/no-extraneous-dependencies
	action,
} from '@storybook/react';
import { SubHeaderBar } from '../src';

const viewSubHeader = {
	title: 'Marketing',
	subTitle: 'Creator John Doe',
	onEdit: () => action('onEdit'),
	onSubmit: () => action('onSubmit'),
	onCancel: () => action('onCancel'),
	onChange: () => action('onChange'),
};

const backAction = {
	idBackAction: 'backAction',
	backActionClick: () => action('backAction'),
};

const injectedComponentsLeft = {
	left: [],
};
const injectedComponentsCenter = {
	center: [
		{
			componentId: 'FilterBar',
			navbar: true,
			docked: false,
			dockable: false,
		},
	],
};
const injectedComponentsRight = {
	right: [
		{
			actionId: 'subheaderbar:action-sharing',
			componentId: 'Action',
		},
		{
			actionId: 'subheaderbar:action-bubbles',
			componentId: 'Action',
		},
	],
};

const props = {
	...viewSubHeader,
	backAction,
};

const ExampleSubHeaderBar = {
	'only-title-no-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} />
		</div>
	),
	'with-right-actions-and-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={[...injectedComponentsLeft, ...injectedComponentsRight]}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
	'with-center-actions-and-no-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={[...injectedComponentsLeft, ...injectedComponentsCenter]}
			/>
		</div>
	),
	'complete-layout': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={[
					...injectedComponentsLeft,
					...injectedComponentsCenter,
					...injectedComponentsRight,
				]}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
