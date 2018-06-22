import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

import { TreeView, IconsProvider } from '../src/index';

const structure = [
	{ name: 'hitmonlee', children: [{ name: 'Hitmonchan' }], toggled: false },
	{ name: 'pikachu', children: [{ name: 'raichu' }], toggled: true },
	{
		name: 'Abra',
		toggled: true,
		selected: true,
		children: [
			{
				name: 'Kadabra',
				toggled: true,
				children: [
					{
						name: 'Alakazam',
					},
				],
			},
		],
	},
];

const structureWithIcons = [
	{
		name: 'hitmonlee',
		children: [{ name: 'Hitmonchan' }],
		toggled: false,
		icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/106-Hitmonlee.png' },
	},
	{
		name: 'pikachu',
		children: [
			{
				name: 'raichu',
				icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/2026-Shiny-Raichu.png' },
			},
		],
		toggled: true,
		icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/2025-Shiny-Pikachu.png' },
	},
	{
		name: 'Abra',
		icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/63-Abra.png' },
		toggled: true,
		selected: true,
		children: [
			{
				name: 'Kadabra',
				icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/64-Kadabra.png' },
				toggled: true,
				children: [
					{
						name: 'Alakazam',
						icon: { name: 'src-http://static.pokemonpets.com/images/monsters-images-300-300/65-Alakazam.png' },
					},
				],
			},
		],
	},
];

const removeAction = [{
	action: action('itemRemoveCallback'),
	icon: 'talend-trash',
	label: 'remove element',
}];

const actions = [{
	action: action('itemAddCallback'),
	icon: 'talend-plus',
	label: 'Add Item',
}, {
	action: action('itemEditCallback'),
	icon: 'talend-pencil',
	label: 'Edit Item',
}, {
	action: action('itemRemoveCallback'),
	icon: 'talend-trash',
	label: 'Remove Item',
}];

const structureWithCounterAndAction = [{
	name: 'hitmonlee',
	toggled: true,
	children: [{
		name: 'raichu',
		showCounter: true,
		counter: 111,
		actions: removeAction,
	}],
	counter: -1,
	showCounter: true,
	actions: removeAction,
}, {
	name: 'pikachu',
	toggled: true,
	counter: 2911,
	showCounter: true,
	actions: removeAction,
}];

const structureWithActions = [{
	name: 'hitmonlee',
	toggled: true,
	children: [{
		name: 'raichu',
		actions,
	}],
	actions,
}, {
	name: 'pikachu',
	toggled: true,
	actions,
}];

const defaultProps = {
	structure,
	itemSelectCallback: action('itemSelectCallback'),
	itemToggleCallback: action('itemToggleCallback'),
};

const withAddAction = {
	...defaultProps,
	addAction: action('added'),
};

const withHeader = {
	...withAddAction,
	headerText: 'some elements',
	addActionLabel: 'add element',
};

const withRemoval = {
	...withAddAction,
};
withRemoval.structure = structureWithCounterAndAction;

const withActions = {
	...withAddAction,
};
withActions.structure = structureWithActions;

const hugeStructure = [{
	name: 'Hitmonlee1',
	toggled: true,
	children: [{
		name: 'Hitmonchan2',
		toggled: true,
		children: [{
			name: 'Hitmonchan3',
			toggled: true,
			children: [{
				name: 'Hitmonchan4',
				toggled: true,
				children: [{
					name: 'Hitmonchan5',
					toggled: true,
					children: [{
						name: 'Hitmonchan6',
						toggled: true,
						children: [{
							name: 'Hitmonchan7',
							toggled: true,
							children: [{
								name: 'Hitmonchan8',
								toggled: true,
								children: [{
									name: 'Hitmonchan9',
									toggled: true,
									children: [{
										name: 'Hitmonchan10',
										toggled: true,
										children: [{
											name: 'Hitmonchen11',
											toggled: true,
											children: [{
												name: 'Hitmonchen12',
												toggled: true,
												children: [{
													name: 'Hitmonchen13',
													toggled: true,
													children: [{
														name: 'Hitmonchen14',
													}],
												}],
											}],
										}],
									}],
								}],
							}],
						}],
					}],
				}],
			}],
		}],
	}],
}];

const withDeepStructure = {
	...defaultProps,
};
withDeepStructure.structure = hugeStructure;

const cornerCaseLongName = {
	...defaultProps,
};
cornerCaseLongName.structure = [{
	name: 'Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1 Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1',
	toggled: true,
}];

const style = { width: '300px', border: '1px solid #eee', marginLeft: '10px' };

storiesOf('TreeView', module)
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set with action example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withAddAction} />
			</div>
		</div>
	))
	.addWithInfo('with custom icons', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				The icons can be customized, passign the Icon components props
			</p>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withAddAction} structure={structureWithIcons} />
			</div>
		</div>
	))
	.addWithInfo('with custom header text', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Custom header and action tooltip property-set example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withHeader} />
			</div>
		</div>
	))
	.addWithInfo('without action', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set without action example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...defaultProps} />
			</div>
		</div>
	))
	.addWithInfo('without header', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set without header example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...defaultProps} noHeader />
			</div>
		</div>
	))
	.addWithInfo('with remove action and counter', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set with remove action example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withRemoval} />
			</div>
		</div>
	))
	.addWithInfo('with many actions', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>A view component to display any tree structure, like folders or categories.</p>
			<h3>Default property-set with remove action example: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withActions} />
			</div>
		</div>
	))
	.addWithInfo('with deep structure', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set with deep structure: </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...withDeepStructure} />
			</div>
		</div>
	))
	.addWithInfo('with long name', () => (
		<div>
			<h1>TreeView</h1>
			<h3>Definition</h3>
			<p>
				A view component to display any tree structure, like folders or categories.
			</p>
			<h3>Default property-set with cornercase: longname </h3>
			<div style={style}>
				<IconsProvider />
				<TreeView {...cornerCaseLongName} />
			</div>
		</div>
	));
