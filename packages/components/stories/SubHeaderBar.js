import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	action,
	storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar, FilterBar, Action } from '../src/index';

const viewProps = {
	title: 'My Long Title is Long Long Lé Long La La La Lé Long Long Long Long',
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onCancel: action('onCancel'),
	onChange: action('onChange'),
};

const backAction = action('onGoBack');

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

const componentAction = {
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

const componentInput = {
	tag: 'form',
	injectedComponent: <input id="inputTitle" type="text" onChange={action('onChange')} value="" />,
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

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('with default left components', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with default left components and edit input', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} edit />
		</div>
	))
	.addWithInfo('with default left components and icon file and edit', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} iconId="talend-file-csv-o" onGoBack={backAction} edit />
		</div>
	))
	.addWithInfo('default left components and subtitle', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with right components and edit', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				iconId="talend-file-csv-o"
				onGoBack={backAction}
				componentsRight={injectedComponentsRight}
				edit
			/>
		</div>
	))
	.addWithInfo('with center components', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				onGoBack={backAction}
				componentsCenter={[componentAction, ...injectedComponentsCenter]}
			/>
		</div>
	))
	.addWithInfo('with center components with tag props', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				subTitle="mySubTitle"
				onGoBack={backAction}
				componentsCenter={[componentInput]}
			/>
		</div>
	))
	.addWithInfo('with center && right components and edit', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				onGoBack={backAction}
				componentsCenter={injectedComponentsCenter}
				componentsRight={injectedComponentsRight}
				edit
			/>
		</div>
	));
