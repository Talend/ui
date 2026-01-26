/* eslint-disable no-console */
import { Action } from '../Actions';
import ActionBar from './ActionBar.component';

// Action object configurations
const primary = {
	label: 'Primary',
	icon: 'talend-cog',
	bsStyle: 'primary',
	'data-feature': 'actionbar.primary',
	onClick: () => console.log('You clicked me'),
};

const actions = {
	left: [
		primary,
		{
			label: 'Secondary1',
			icon: 'talend-cog',
			'data-feature': 'actionbar.secondary',
			onClick: () => console.log('You clicked me'),
		},
		{
			displayMode: ActionBar.DISPLAY_MODES.SPLIT_DROPDOWN,
			label: 'Secondary3',
			icon: 'talend-cog',
			'data-feature': 'actionbar.splitdropdown',
			onClick: () => console.log('on split button click'),
			items: [
				{
					label: 'From Local',
					'data-feature': 'actionbar.splitdropdown.items',
					onClick: () => console.log('From Local click'),
				},
				{
					label: 'From Remote',
					'data-feature': 'actionbar.splitdropdown.items',
					onClick: () => console.log('From Remote click'),
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
					onClick: () => console.log('From Local click'),
				},
				{
					label: 'From Remote',
					onClick: () => console.log('From Remote click'),
				},
			],
		},
	],
	right: [
		{
			label: 'Secondary4',
			icon: 'talend-upload',
			displayMode: 'file',
			onChange: () => console.log('You changed me'),
		},
		{
			label: 'Secondary5',
			icon: 'talend-cog',
			onClick: () => console.log('You clicked me'),
		},
	],
};

const multi3 = {
	label: 'multi3',
	icon: 'talend-cog',
	onClick: () => console.log('You clicked me'),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'talend-cog',
			onClick: () => console.log('You clicked me'),
		},
		{
			label: 'multi2',
			icon: 'talend-cog',
			onClick: () => console.log('You clicked me'),
		},
	],
	center: [
		{
			label: 'multi5',
			icon: 'talend-cog',
			onClick: () => console.log('You clicked me'),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'talend-cog',
			onClick: () => console.log('You clicked me'),
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
					onClick: () => console.log('cog'),
				},
				{
					label: 'you are a super star',
					icon: 'talend-badge',
					hideLabel: true,
					onClick: () => console.log('badge'),
				},
				{
					label: 'but don t click this',
					icon: 'talend-cross',
					hideLabel: true,
					onClick: () => console.log('boom'),
				},
				{
					label: 'edit me',
					icon: 'talend-pencil',
					hideLabel: true,
					onClick: () => console.log('oh yes'),
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
					onClick: () => console.log('add !'),
				},
				{
					label: 'search',
					icon: 'talend-search',
					hideLabel: true,
					onClick: () => console.log('search'),
				},
				{
					label: 'star',
					icon: 'talend-star',
					hideLabel: true,
					onClick: () => console.log('star'),
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
					onClick: () => console.log('dataprep'),
				},
				{
					label: 'go to elastic',
					icon: 'talend-elastic',
					hideLabel: true,
					onClick: () => console.log('elastic'),
				},
				{
					label: 'go to cloud engine',
					icon: 'talend-cloud-engine',
					hideLabel: true,
					onClick: () => console.log('cloud-engine'),
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
					onClick: () => console.log('table'),
				},
				{
					label: 'trash',
					icon: 'talend-trash',
					hideLabel: true,
					onClick: () => console.log('trash'),
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
	onClick: () => console.log('multiple delete'),
	className: 'btn-icon-text',
};

const multiDuplicate = {
	label: 'Duplicate',
	icon: 'talend-files-o',
	onClick: () => console.log('multiple duplicate'),
	className: 'btn-icon-text',
};

const multiUpdate = {
	label: 'Update',
	icon: 'talend-file-move',
	onClick: () => console.log('multiple update'),
	className: 'btn-icon-text',
};

const multiFavorite = {
	label: 'Favorite',
	icon: 'talend-star',
	onClick: () => console.log('multiple favorite'),
	className: 'btn-icon-text',
};

const multiCertify = {
	label: 'Certify',
	icon: 'talend-badge',
	onClick: () => console.log('multiple certify'),
	className: 'btn-icon-text',
};

const massActions = {
	left: [multiDelete, multiDuplicate, multiUpdate],
};

const appMassActions = {
	left: [multiFavorite, multiCertify],
};

const meta = {
	title: 'Components/Form - Controls/ActionBar',
	component: ActionBar,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => (
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
	),
};

export const Custom = {
	render: () => (
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
						<Action
							label="hello Action"
							icon="talend-trash"
							onClick={() => console.log('onClick')}
						/>
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
	),
};
