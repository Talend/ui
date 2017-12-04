import React from 'react';
import {
	// eslint-disable-line import/no-extraneous-dependencies
	action,
	storiesOf,
} from '@storybook/react';
import { IconsProvider, SubHeaderBar, FilterBar, Action } from '../src/index';
import InputTitleSubHeader from '../src/SubHeaderBar/InputTitleSubHeader';

const mockInputSubHeader = {
	onEdit: action('onEdit'),
	onSubmit: action('onSubmit'),
	onCancel: action('onCancel'),
	onChange: action('onChange'),
};

const backAction = () => action('onGoBack');

const inputNoSubTitleNoIcon = {
	injectedComponent: <InputTitleSubHeader title="Marketing" {...mockInputSubHeader} />,
};

const inputNoSubTitleWithIcon = {
	injectedComponent: (
		<InputTitleSubHeader title="Marketing" iconFile="talend-file-csv-o" {...mockInputSubHeader} />
	),
};

const inputWithSubTitleNoIcon = {
	injectedComponent: (
		<InputTitleSubHeader title="Marketing" subTitle="Creator John Doe" {...mockInputSubHeader} />
	),
};

const inputWithSubTitleWithIcon = {
	injectedComponent: (
		<InputTitleSubHeader
			title="Marketing"
			subTitle="Creator John Doe"
			iconFile="talend-file-csv-o"
			{...mockInputSubHeader}
		/>
	),
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

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addWithInfo('with default left actions alone', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with icon file no actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar onGoBack={backAction} componentsLeft={[inputWithSubTitleWithIcon]} />
		</div>
	))
	.addWithInfo('with subtitle no icon file', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar onGoBack={backAction} componentsLeft={[inputWithSubTitleNoIcon]} />
		</div>
	))
	.addWithInfo('with icon file no subtitle and right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				onGoBack={backAction}
				componentsLeft={[inputNoSubTitleWithIcon]}
				componentsRight={injectedComponentsRight}
			/>
		</div>
	))
	.addWithInfo('with no icon file no subtitle and center actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				onGoBack={backAction}
				componentsLeft={[inputNoSubTitleNoIcon]}
				componentsCenter={[action4, ...injectedComponentsCenter]}
			/>
		</div>
	))
	.addWithInfo('with subtitle icon file and center && right actions', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				onGoBack={backAction}
				componentsLeft={[inputWithSubTitleWithIcon]}
				componentsCenter={injectedComponentsCenter}
				componentsRight={injectedComponentsRight}
			/>
		</div>
	));
