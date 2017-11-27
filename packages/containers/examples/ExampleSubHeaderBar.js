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

const actionsRight = ['subheaderbar:action-sharing', 'subheaderbar:action-bubbles'];
const actionsCenter = ['subheaderbar:action-filter'];

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
				actionsRight={actionsRight}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
	'with-center-actions-and-no-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				actionsCenter={[...actionsCenter, ...actionsRight]}
			/>
		</div>
	),
	'complete-layout': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				actionsCenter={actionsCenter}
				actionsRight={actionsRight}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
