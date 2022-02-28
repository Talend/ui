import React from 'react';
import { action } from '@storybook/addon-actions';
import FilterBar from '../FilterBar';
import Tag from '../Tag';
import SubHeaderBar from './SubHeaderBar.component';

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
		label: 'icon + text',
		bsStyle: 'link',
		icon: 'talend-share-alt',
		onClick: action('icon + text'),
	},
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
		displayMode: 'iconToggle',
		active: true,
	},
	{
		label: 'action3',
		bsStyle: 'link',
		icon: 'talend-bell',
		onClick: action('return action3'),
		hideLabel: true,
		displayMode: 'iconToggle',
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

export default {
	title: 'Navigation/SubHeader',
};

export const WithDefault = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} />
	</div>
);

export const WithEditable = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} editable />
	</div>
);

export const WithIcon = () => (
	<div>
		<SubHeaderBar {...viewProps} iconId="talend-file-csv-o" onGoBack={backAction} />
	</div>
);

export const WithSubtitle = () => (
	<div>
		<SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} />
	</div>
);

export const WithLoadingSubtitle = () => (
	<div>
		<SubHeaderBar {...viewProps} subTitleLoading onGoBack={backAction} />
	</div>
);

export const WithCustomSubtitle = () => (
	<div>
		<SubHeaderBar
			{...viewProps}
			subTitle="mySubTitle"
			onGoBack={backAction}
			subTitleAs={({ subTitle }) => <Tag bsStyle="info">{subTitle}</Tag>}
		/>
	</div>
);

export const WithRightComponents = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight} />
	</div>
);

export const WithCenterComponents = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} center={[componentAction]}>
			{center}
		</SubHeaderBar>
	</div>
);

export const WithCenterComponentsWithTagProps = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction}>
			<SubHeaderBar.Content tag="form" center>
				<input id="inputTitle" type="text" onChange={action('onChange')} value="" />
			</SubHeaderBar.Content>
		</SubHeaderBar>
	</div>
);

export const WithCenterRightComponents = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight}>
			{center}
		</SubHeaderBar>
	</div>
);

export const WithAll = () => (
	<div>
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
);

export const WithSkeleton = () => (
	<div>
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
);

export const WithInProgress = () => (
	<div>
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
);

export const WithRightActionsLoading = () => (
	<div>
		<SubHeaderBar {...viewProps} onGoBack={backAction} rightActionsLoading />
	</div>
);
