import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	action,
	storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar, FilterBar } from '../src/index';

const viewSubHeader = {
	title: 'Marketing',
	subTitle: 'Creator John Doe',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onCancel: action('onCancel'),
	onChange: action('onChange'),
};

const backAction = {
	onClickBackArrow: action('onClickBackArrow'),
};

const actionsRight = [
	{
		id: 'action1',
		label: 'action1',
		type: 'action',
		bsStyle: 'link',
		icon: 'talend-share-alt',
		onClick: action('return action1'),
		hideLabel: true,
	},
	{
		id: 'action2',
		label: 'action2',
		type: 'action',
		bsStyle: 'link',
		icon: 'talend-activity',
		onClick: action('return action2'),
		hideLabel: true,
	},
	{
		id: 'action3',
		label: 'action3',
		type: 'action',
		icon: 'talend-bell',
		bsStyle: 'link',
		onClick: action('return action3'),
		hideLabel: true,
	},
];

const actionsCenter = [
	{
		tag: 'form',
		type: 'component',
		component: (
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
	backAction,
};

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('with icon file no actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} iconFile="talend-file-csv-o" />
		</div>
	))
	.addWithInfo('without no icon file', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} />
		</div>
	))
	.addWithInfo('with icon file and right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar iconFile="talend-file-csv-o" actionsRight={actionsRight} {...props} />
		</div>
	))
	.addWithInfo('with no icon file and center actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar actionsCenter={actionsCenter} {...props} />
		</div>
	))
	.addWithInfo('with icon file and center && right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				iconFile="talend-file-csv-o"
				actionsCenter={actionsCenter}
				actionsRight={actionsRight}
				{...props}
			/>
		</div>
	));
