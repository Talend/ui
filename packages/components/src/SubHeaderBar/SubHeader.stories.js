import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Label } from 'react-bootstrap';
import IconsProvider from '../IconsProvider';
import FilterBar from '../FilterBar';
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

const stories = storiesOf('Navigation/SubHeader', module);

stories
	.add('with default', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} />
		</div>
	))
	.add('with editable', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} editable />
		</div>
	))
	.add('with icon', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} iconId="talend-file-csv-o" onGoBack={backAction} />
		</div>
	))
	.add('with subtitle', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} />
		</div>
	))
	.add('with loading subtitle', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} subTitleLoading onGoBack={backAction} />
		</div>
	))
	.add('with custom subtitle', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar
				{...viewProps}
				subTitle="mySubTitle"
				onGoBack={backAction}
				subTitleAs={({ subTitle }) => <Label className="label-info">{subTitle}</Label>}
			/>
		</div>
	))
	.add('with right components', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight} />
		</div>
	))
	.add('with center components', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} center={[componentAction]}>
				{center}
			</SubHeaderBar>
		</div>
	))
	.add('with center components with tag props', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction}>
				<SubHeaderBar.Content tag="form" center>
					<input id="inputTitle" type="text" onChange={action('onChange')} value="" />
				</SubHeaderBar.Content>
			</SubHeaderBar>
		</div>
	))
	.add('with center && right components', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight}>
				{center}
			</SubHeaderBar>
		</div>
	))
	.add('with all', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
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
	.add('with skeleton', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
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
	.add('with inProgress', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
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
	))
	.add('with right actions loading', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<SubHeaderBar {...viewProps} onGoBack={backAction} rightActionsLoading />
		</div>
	));
