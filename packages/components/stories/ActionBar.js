import React from 'react';
import talendIcons from '@talend/icons/dist/react';
import { storiesOf, action } from '@storybook/react';

import { Action, Icon, ActionBar, IconsProvider } from '../src/index';

const primary = {
	label: 'Primary',
	icon: 'talend-cog',
	bsStyle: 'primary',
	onClick: action('You clicked me'),
};

const actions = {
	left: [
		primary,
		{
			label: 'Secondary1',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
		{
			displayMode: ActionBar.DISPLAY_MODES.SPLIT_DROPDOWN,
			label: 'Secondary3',
			icon: 'talend-cog',
			onClick: action('on split button click'),
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
			emptyDropdownLabel: 'No option',
		},
		{
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
			emptyDropdownLabel: 'No option',
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

const icons = {
	'talend-badge': talendIcons['talend-badge'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-table': talendIcons['talend-table'],
	'talend-trash': talendIcons['talend-trash'],
	'talend-upload': talendIcons['talend-upload'],
};

storiesOf('ActionBar', module)
	.addWithInfo('default', () => (
		<nav>
			<IconsProvider defaultIcons={icons} />
			<p>No Selected, Layout: Left Space Right</p>
			<div id="default">
				<ActionBar {...Object.assign({}, basicProps, { selected: 0 })} />
			</div>
			<p>1 Selected, Layout: Left Space Right</p>
			<div id="selected">
				<ActionBar {...Object.assign({}, basicProps, { selected: 1 })} />
			</div>

			<p>1 Selected, Layout: Right</p>
			<div id="right">
				<ActionBar
					selected={1}
					actions={{ left: [primary] }}
					multiSelectActions={{ right: [multi3] }}
				/>
			</div>
			<p>Toolbar with btn-group and only icons</p>
			<div id="btn-group">
				<ActionBar
					actions={btnGroupActions}
				/>
			</div>
		</nav>
	))
	.addWithInfo('custom', () => (
		<nav>
			<IconsProvider defaultIcons={icons} />
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
							onClick={action('onClick')}
						/>
					</ActionBar.Content>
					<ActionBar.Content tag="form" role="search" center>
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Search" />
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
					</ActionBar.Content>
					<ActionBar.Content tag="p" right>
						Hello paragraph
					</ActionBar.Content>
				</ActionBar>
			</div>
		</nav>
	));
