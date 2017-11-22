import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	action,
	storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar, ActionBar } from '../src/index';

const viewSubHeader = {
	title: 'Marketing',
	subTitle: 'Creator John Doe',
	onClickValidate: action('onClickValidate'),
};

const returnArrowProps = {
	id: 'returnArrow',
	icon: 'talend-arrow-left',
	onClick: action('return action'),
};

const rightActions = {
	right: [
		{
			displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
			actions: [
				{
					label: 'Secondary4',
					icon: 'talend-upload',
					onChange: action('You changed me'),
				},
				{
					label: 'Secondary5',
					icon: 'talend-cog',
					onClick: action('You clicked me'),
				},
			],
		},
	],
};

const props = {
	...viewSubHeader,
	returnAction: returnArrowProps,
	rightActions,
};

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('with icon file no actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar returnAction={returnArrowProps} iconFile="talend-file-csv-o" {...viewSubHeader} />
		</div>
	))
	.addWithInfo('without icon file no actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar returnAction={returnArrowProps} {...viewSubHeader} />
		</div>
	))
	.addWithInfo('with icon file and actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} />
		</div>
	));
