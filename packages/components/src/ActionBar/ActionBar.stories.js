import React from 'react';
import { action } from '@storybook/addon-actions';
import { Action } from '../Actions';
import ActionBar from './ActionBar.component';

const primary = {
	label: 'Primary',
	icon: 'talend-cog',
	bsStyle: 'primary',
	'data-feature': 'actionbar.primary',
	onClick: action('You clicked me'),
};

const actions = {
	left: [
		primary,
		{
			label: 'Secondary1',
			icon: 'talend-cog',
			'data-feature': 'actionbar.secondary',
			onClick: action('You clicked me'),
		},
		{
			displayMode: ActionBar.DISPLAY_MODES.SPLIT_DROPDOWN,
			label: 'Secondary3',
			icon: 'talend-cog',
			'data-feature': 'actionbar.splitdropdown',
			onClick: action('on split button click'),
			items: [
				{
					label: 'From Local',
					'data-feature': 'actionbar.splitdropdown.items',
					onClick: action('From Local click'),
				},
				{
					label: 'From Remote',
					'data-feature': 'actionbar.splitdropdown.items',
					onClick: action('From Remote click'),
				},
			],
			emptyDropdownLabel: 'No option',
		},
		{
			id: 'dropdown',
			displayMode: ActionBar.DISPLAY_MODES.DROPDOWN,
			label: 'Dropdown',
			icon: 'talend-cog',
			items: [
				{
					label: 'From Local',
					onClick: action('From Local click'),
				},
				{
					label: 'From Remote',
					onClick: action('From Remote click'),
				},
			],
		},
	],
	right: [
		{
			label: 'Secondary4',
			icon: 'talend-upload',
			displayMode: 'file',
			onChange: action('You changed me'),
		},
		{
			label: 'Secondary5',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
};
const multi3 = {
	label: 'multi3',
	icon: 'talend-cog',
	onClick: action('You clicked me'),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
		{
			label: 'multi2',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
	center: [
		{
			label: 'multi5',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
};

const btnGroupActions = {
	left: [
		{
			displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
			actions: [
				{
					label: 'hidden mean tooltips',
					icon: 'talend-cog',
					hideLabel: true,
					onClick: action('cog'),
				},
				{
					label: 'you are a super star',
					icon: 'talend-badge',
					hideLabel: true,
					onClick: action('badge'),
				},
				{
					label: 'but don t click this',
					icon: 'talend-cross',
					hideLabel: true,
					onClick: action('boom'),
				},
				{
					label: 'edit me',
					icon: 'talend-pencil',
					hideLabel: true,
					onClick: action('oh yes'),
				},
			],
		},
		{
			displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
			actions: [
				{
					label: 'you can also add',
					icon: 'talend-plus-circle',
					hideLabel: true,
					onClick: action('add !'),
				},
				{
					label: 'search',
					icon: 'talend-search',
					hideLabel: true,
					onClick: action('search'),
				},
				{
					label: 'star',
					icon: 'talend-star',
					hideLabel: true,
					onClick: action('star'),
				},
			],
		},
	],
	center: [
		{
			displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
			actions: [
				{
					label: 'go to dataprep',
					icon: 'talend-dataprep',
					hideLabel: true,
					onClick: action('dataprep'),
				},
				{
					label: 'go to elastic',
					icon: 'talend-elastic',
					hideLabel: true,
					onClick: action('elastic'),
				},
				{
					label: 'go to cloud engine',
					icon: 'talend-cloud-engine',
					hideLabel: true,
					onClick: action('cloud-engine'),
				},
			],
		},
	],
	right: [
		{
			displayMode: ActionBar.DISPLAY_MODES.BTN_GROUP,
			actions: [
				{
					label: 'table',
					icon: 'talend-table',
					hideLabel: true,
					onClick: action('table'),
				},
				{
					label: 'trash',
					icon: 'talend-trash',
					hideLabel: true,
					onClick: action('trash'),
				},
			],
		},
	],
};

const basicProps = {
	actions,
	multiSelectActions,
};
const multiDelete = {
	label: 'Delete',
	icon: 'talend-trash',
	onClick: action('multiple delete'),
	className: 'btn-icon-text',
};
const multiDuplicate = {
	label: 'Duplicate',
	icon: 'talend-files-o',
	onClick: action('multiple duplicate'),
	className: 'btn-icon-text',
};
const multiUpdate = {
	label: 'Update',
	icon: 'talend-file-move',
	onClick: action('multiple update'),
	className: 'btn-icon-text',
};
const multiFavorite = {
	label: 'Favorite',
	icon: 'talend-star',
	onClick: action('multiple favorite'),
	className: 'btn-icon-text',
};
const multiCertify = {
	label: 'Certify',
	icon: 'talend-badge',
	onClick: action('multiple certify'),
	className: 'btn-icon-text',
};
const massActions = {
	left: [multiDelete, multiDuplicate, multiUpdate],
};

const appMassActions = {
	left: [multiFavorite, multiCertify],
};

export default {
	title: 'Form/Controls/ActionBar',
};

export const Default = () => (
	<nav>
		<p>No Selected, Layout: Left Space Right</p>
		<div id="default">
			<ActionBar {...basicProps} selected={0} />
		</div>
		<p>1 Selected, Layout: Left Center Right</p>
		<div id="selected">
			<ActionBar {...basicProps} selected={1} />
		</div>

		<p>1 Selected, Layout: Right</p>
		<div id="right">
			<ActionBar
				selected={1}
				actions={{ left: [primary] }}
				multiSelectActions={{ right: [multi3] }}
			/>
		</div>
		<p>Toolbar with btn-group and only icons/ Layout: left, center, right</p>
		<div id="btn-group">
			<ActionBar actions={btnGroupActions} />
		</div>
		<p>3 items selected, with mass/bulk Actions</p>
		<div id="mass-actions">
			<ActionBar
				selected={3}
				multiSelectActions={massActions}
				appMultiSelectActions={appMassActions}
			/>
		</div>
	</nav>
);

export const Custom = () => (
	<nav>
		<div id="default">
			<ActionBar>
				<ActionBar.Content tag="a" left href="#/foo/bar">
					Hello anchor
				</ActionBar.Content>
				<ActionBar.Content tag="button" className="btn btn-default" left>
					Hello button
				</ActionBar.Content>
				<ActionBar.Content left>
					<Action label="hello Action" icon="talend-trash" onClick={action('onClick')} />
				</ActionBar.Content>
				<ActionBar.Content tag="form" role="search" center>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Search" />
					</div>
					<button type="submit" className="btn btn-default">
						Submit
					</button>
				</ActionBar.Content>
				<ActionBar.Content tag="p" right>
					Hello paragraph
				</ActionBar.Content>
			</ActionBar>
		</div>
	</nav>
);
