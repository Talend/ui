import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { IconsProvider, SubHeaderBar, FilterBar } from '../src/index';

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
		label: 'action1',
		bsStyle: 'link',
		icon: 'talend-share-alt',
		onClick: action('return action1'),
		hideLabel: true,
	},
	{
		label: 'Action2',
		bsStyle: 'link',
		icon: 'talend-activity',
		onClick: action('return action2'),
	},
	{
		label: 'action3',
		bsStyle: 'link',
		icon: 'talend-bell',
		onClick: action('return action3'),
		hideLabel: true,
	},
];

const componentAction = {
	label: 'action4',
	bsStyle: 'link',
	icon: 'talend-bell',
	onClick: action('return action4'),
	hideLabel: true,
};

const center = (
	<SubHeaderBar.Content center>
		<FilterBar
			t={() => action('t')}
			onFilter={() => action('onFilter')}
			navbar
			docked={false}
			dockable={false}
		/>
	</SubHeaderBar.Content>
);

const stories = storiesOf('SubHeaderBar', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(checkA11y)
	.addWithInfo('with default', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with editable', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} editable />
		</div>
	))
	.addWithInfo('with icon', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} iconId="talend-file-csv-o" onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with subtitle', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} />
		</div>
	))
	.addWithInfo('with right components', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight} />
		</div>
	))
	.addWithInfo('with center components', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} center={[componentAction]}>
				{center}
			</SubHeaderBar>
		</div>
	))
	.addWithInfo('with center components with tag props', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction}>
				<SubHeaderBar.Content tag="form" center>
					<input id="inputTitle" type="text" onChange={action('onChange')} value="" />
				</SubHeaderBar.Content>
			</SubHeaderBar>
		</div>
	))
	.addWithInfo('with center && right components', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight}>
				{center}
			</SubHeaderBar>
		</div>
	))
	.addWithInfo('with all', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				onGoBack={backAction}
				right={injectedComponentsRight}
			>
				{center}
			</SubHeaderBar>
		</div>
	))
	.addWithInfo('with skeleton', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				onGoBack={backAction}
				loading
			>
				{center}
			</SubHeaderBar>
		</div>
	))
	.addWithInfo('with inProgress', () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...viewProps}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				onGoBack={backAction}
				inProgress
				editable
			>
				{center}
			</SubHeaderBar>
		</div>
	));
