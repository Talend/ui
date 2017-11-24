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
	onClickEdit: action('onClickEdit'),
	onClickValidate: action('onClickValidate'),
	onClickCancel: action('onClickCancel'),
};

const backAction = {
	id: 'backAction',
	icon: 'talend-arrow-left',
	onClick: action('return action'),
	className: 'tc-subheader-bar-back-icon',
};

const actionsRight = [
	{
		tag: 'button',
		icon: 'talend-share-alt',
		onClick: action('return action1'),
		hideLabel: true,
	},
	{
		tag: 'button',
		icon: 'talend-activity',
		onClick: action('return action2'),
		hideLabel: true,
	},
	{
		tag: 'button',
		icon: 'talend-bell',
		onClick: action('return action3'),
		hideLabel: true,
	},
];

const actionsCenter = [
	{
		tag: 'form',
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
	.addWithInfo('without icon file no actions', () => (
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
	.addWithInfo('with icon file and center actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar iconFile="talend-file-csv-o" actionsCenter={actionsCenter} {...props} />
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
