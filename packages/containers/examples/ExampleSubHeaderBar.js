import React from 'react';
import { IconsProvider } from '@talend/react-components';
import {
	// eslint-disbale-line import/no-extraneous-dependencies
	action,
} from '@storybook/react';
import { SubHeaderBar } from '../src';

const viewSubHeader = {
	title: 'MyTitle',
	onEdit: () => action('onEdit'),
	onSubmit: () => action('onSubmit'),
	onCancel: () => action('onCancel'),
	onChange: () => action('onChange'),
};

const backAction = {
	backActionClick: () => action('backAction'),
};

const injectedComponentsLeft = {
	left: [
		{
			actionId: 'subheaderbar:action-sharing',
			componentId: 'Action',
		},
	],
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
			<SubHeaderBar subTitle="mySubTitle" {...props} />
		</div>
	),
	'with-right-actions-and-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				subTitle="mySubTitle"
				injectedComponents={injectedComponentsRight}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
	'with-center-actions-and-no-icon-no-subtitle': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} injectedComponents={injectedComponentsCenter} />
		</div>
	),
	'with-left-actions-and-no-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} subTitle="mySubTitle" injectedComponents={injectedComponentsLeft} />
		</div>
	),
	'with-center-and-right-actions': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={Object.assign({}, injectedComponentsCenter, injectedComponentsRight)}
				iconFile="talend-file-csv-o"
				subTitle="mySubTitle"
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
