import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	action,
	storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar, FilterBar, Action } from '../src/index';

const viewSubHeader = {
	title: 'Marketing',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onCancel: action('onCancel'),
	onChange: action('onChange'),
};

const backAction = {
	onGoBack: action('onGoBack'),
};

const injectedComponentsRight = [
	{
		injectedComponent: (
			<Action
				label="action1"
				bsStyle="link"
				icon="talend-share-alt"
				onClick={action('return action1')}
				hideLabel
			/>
		),
	},
	{
		injectedComponent: (
			<Action
				label="action2"
				bsStyle="link"
				icon="talend-activity"
				onClick={action('return action2')}
				hideLabel
			/>
		),
	},
	{
		injectedComponent: (
			<Action
				label="action3"
				bsStyle="link"
				icon="talend-bell"
				onClick={action('return action3')}
				hideLabel
			/>
		),
	},
];

const action4 = {
	injectedComponent: (
		<Action
			label="action4"
			bsStyle="link"
			icon="talend-bell"
			onClick={action('return action4')}
			hideLabel
		/>
	),
};

const injectedComponentsCenter = [
	{
		injectedComponent: (
			<FilterBar
				t={() => action('t')}
				onFilter={() => action('onFilter')}
				navbar
				docked={false}
				dockable={false}
			/>
		),
	},
];

const props = {
	...viewSubHeader,
	...backAction,
};

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('with icon file no actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} subTitle="Creator John Doe" iconFile="talend-file-csv-o" />
		</div>
	))
	.addWithInfo('without no icon file', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} subTitle="Creator John Doe" />
		</div>
	))
	.addWithInfo('with icon file no subtitle and right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar iconFile="talend-file-csv-o" componentsRight={injectedComponentsRight} {...props} />
		</div>
	))
	.addWithInfo('with no icon file, no subtitle and center actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				subTitle="Creator John Doe"
				componentsCenter={[action4, ...injectedComponentsCenter]}
				{...props}
			/>
		</div>
	))
	.addWithInfo('with icon file and center && right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				iconFile="talend-file-csv-o"
				componentsCenter={injectedComponentsCenter}
				componentsRight={injectedComponentsRight}
				{...props}
			/>
		</div>
	));
