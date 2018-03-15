import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { ObjectViewer, IconsProvider } from '../src/index';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
};

const stories = storiesOf('AvroViewer', module);

const oldSchema = [
	{
		name: 'id',
		doc: 'Id',
		type: {
			type: 'integer',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
	{
		name: 'name',
		doc: 'Name',
		type: {
			type: 'string',
			dqType: 'Recipe',
			dqTypeKey: 'RECIPE',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
	{
		name: 'price',
		doc: 'Price per unit',
		type: {
			type: 'decimal',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
	{
		name: 'ingredients',
		doc: 'Ingredients',
		type: {
			type: 'array',
		},
		items: {
			name: 'ingredient',
			type: 'record',
			fields: [
				{
					name: 'name',
					doc: 'Name',
					type: {
						type: 'string',
						dqType: 'Ingredient',
						dqTypeKey: 'INGREDIENT',
					},
					'@talend-quality@': {
						0: 2,
						1: 88,
						'-1': 10,
					},
				},
				{
					name: 'amount',
					doc: 'Amount',
					type: {
						type: 'number',
					},
					'@talend-quality@': {
						0: 4,
						1: 96,
						'-1': 0,
					},
				},
				{
					name: 'unit',
					doc: 'Unit',
					type: {
						type: 'string',
						dqType: 'Unit',
						dqTypeKey: 'UNIT',
					},
					'@talend-quality@': {
						0: 4,
						1: 96,
						'-1': 0,
					},
				},
				{
					name: 'nested',
					doc: 'Nested things',
					type: {
						type: 'record',
					},
					fields: [
						{
							name: 'poo',
							doc: 'Poo',
							type: {
								type: 'string',
								dqType: 'Taste',
								dqTypeKey: 'TASTE',
							},
							'@talend-quality@': {
								0: 2,
								1: 88,
								'-1': 10,
							},
						},
						{
							name: 'pee',
							doc: 'Pee',
							type: {
								type: 'string',
								dqType: 'Taste',
								dqTypeKey: 'TASTE',
							},
							'@talend-quality@': {
								0: 4,
								1: 96,
								'-1': 0,
							},
						},
					],
				},
			],
		},
	},
	{
		name: 'ratings',
		doc: 'Ratings',
		type: {
			type: 'array',
		},
		items: {
			name: 'rating',
			type: 'record',
			fields: [
				{
					name: 'michelin',
					doc: 'Michelin',
					type: {
						type: 'integer',
					},
					'@talend-quality@': {
						0: 2,
						1: 88,
						'-1': 10,
					},
				},
				{
					name: 'gaultmillau',
					doc: 'Gault & Millau',
					type: {
						type: 'integer',
					},
					'@talend-quality@': {
						0: 4,
						1: 96,
						'-1': 0,
					},
				},
			],
		},
	},
];
const schema = [
	{
		name: 'name',
		doc: 'Name',
		type: {
			type: 'string',
			dqType: 'Recipe',
			dqTypeKey: 'RECIPE',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
	{
		name: 'price',
		doc: 'Price per unit',
		type: {
			type: 'decimal',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
	{
		name: 'ingredients',
		doc: 'Ingredients',
		type: {
			type: 'array',
		},
		items: {
			name: 'ingredient',
			type: 'record',
			fields: [
				{
					name: 'name',
					doc: 'Name',
					type: {
						type: 'string',
						dqType: 'Ingredient',
						dqTypeKey: 'INGREDIENT',
					},
					'@talend-quality@': {
						0: 2,
						1: 88,
						'-1': 10,
					},
				},
				{
					name: 'amount',
					doc: 'Amount',
					type: {
						type: 'number',
					},
					'@talend-quality@': {
						0: 4,
						1: 96,
						'-1': 0,
					},
				},
				{
					name: 'unit',
					doc: 'Unit',
					type: {
						type: 'string',
						dqType: 'Unit',
						dqTypeKey: 'UNIT',
					},
					'@talend-quality@': {
						0: 4,
						1: 96,
						'-1': 0,
					},
				},
			],
		},
	},
];
const data = [
	{
		value: {
			name: {
				value: 'Nom de la gare',
				quality: 1,
			},
			price: {
				value: 'Code UIC',
				quality: 1,
			},
		},
		quality: 1,
	},
	{
		value: {
			name: {
				value: 'Aéroport Charles de Gaulle 2 TGV',
				quality: 1,
			},
			price: {
				value: '271494',
				quality: 1,
			},
			ingredients: {
				value: [
					{
						value: {
							name: { quality: 1, value: 'brown sugar' },
							amount: { quality: 1, value: 100 },
							unit: { quality: 1, value: 'grams' },
						},
						quality: 1,
					},
					{
						value: {
							name: { quality: 1, value: 'egg' },
							amount: { quality: 1, value: 20 },
							unit: { quality: -1, value: 'kilograms' },
						},
						quality: -1,
					},
				],
				quality: -1,
			},
		},
		quality: 1,
	},
];
for (let i = 0; i < 100; i++) {
	data.push(data[1]);
}

const sample = {
	schema,
	data,
};

const recordFilterAction = action('onFilterClick');
const recordRemovalAction = action('onRemoveClick');
const qualityMenu = {
	invalid: [
		{ label: 'Filter invalid values', onClick: recordFilterAction },
		{ label: 'Remove invalid values', onClick: recordRemovalAction },
	],
	empty: [
		{ label: 'Filter empty values', onClick: recordFilterAction },
		{ label: 'Remove empty values', onClick: recordRemovalAction },
	],
	valid: [
		{ label: 'Filter valid values', onClick: recordFilterAction },
		{ label: 'Remove valid values', onClick: recordRemovalAction },
	],
};

const modelItemMenu = [
	{ label: 'LOL action', onClick: action('onLolClick') },
	{ label: 'MDR action', onClick: action('onMdrClick') },
];

function ToggleManager(Component) {
	return class ToggledComponentWrapper extends React.Component {
		static displayName = `ToggleManager(${Component.displayName})`;
		static propTypes = {
			onToggle: PropTypes.func,
		};

		constructor(props) {
			super(props);
			this.state = { opened: [], isSingle: false };
			this.onToggle = this.onToggle.bind(this);
		}

		onToggle(event, options, index = 'default') {
			let itemOpened = this.state.opened && this.state.opened[index] || [];
			if (options.isOpened) {
				itemOpened = itemOpened.filter(path => path !== options.jsonpath);
			} else {
				itemOpened = itemOpened.concat(options.jsonpath);
			}

			this.setState({
				isSingle: index === 'default',
				opened: {
					...this.state.opened,
					[index]: itemOpened,
				},
			});

			if (this.props.onToggle) {
				this.props.onToggle(event, options, index);
			}
		}

		render() {
			const opened = this.state.isSingle ? this.state.opened.default : this.state.opened;
			return (
				<Component {...this.props} onToggle={this.onToggle} opened={opened} />
			);
		}
	};
}

const ObjectViewerWithToggle = ToggleManager(ObjectViewer);

class AvroViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { highlighted: [] };
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, jsonpath) {
		const adaptedJsonPath = jsonpath.replace(/[-[{}()*+?.,\\^$|#\s]/g, '\\$&').replace(/\[]/g, '[[0-9]+]');
		this.setState({
			highlighted: [new RegExp(`^${adaptedJsonPath}$`)],
		});
	}

	render() {
		const partStyle = {
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: 50,
		};
		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
				<div style={partStyle}>
					<ObjectViewerWithToggle
						displayMode="model"
						data={sample.schema}
						menu={modelItemMenu}
						onSelect={this.onSelect}

						quality={{
							key: '@talend-quality@',
							menu: qualityMenu,
						}}
					/>
				</div>
				<div style={partStyle}>
					<ObjectViewerWithToggle
						displayMode={'records'}
						data={sample.data}
						highlighted={this.state.highlighted}
						schema={sample.schema}
					/>
				</div>
			</div>
		);
	}
}

stories
	.addWithInfo('data model', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewerWithToggle
				displayMode="model"
				data={sample.schema}
				menu={modelItemMenu}
				onSelect={action('onSelect')}
				onToggle={action('onToggle')}

				quality={{
					key: '@talend-quality@',
					menu: qualityMenu,
				}}
			/>
			<h2>TODO</h2>
			<ul>
				<li>Accessibility: navigate from item to item with up/down keys</li>
				<li>Code duplication: to manage focus accessibility in menus, we had to implement some code in Item menu
					(that use Action) and in QualityCircles (that use PieChartButton). The code is the same but in 2
					places, let's try to remove this duplication
				</li>
				<li>i18n</li>
				<li>Missing (don't have the model): cardinality</li>
				<li>Unknown: object type. For now if type === object we don't display menus</li>
				<li>Container: pass all extra props (not accepted by opther object viewers) or let's not integrate it
					into ObjectViewer (but this solution would duplicate toggle code).
				</li>
			</ul>
		</div>
	))
	.addWithInfo('records', () => (
		<div style={{ height: 500 }}>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewerWithToggle
				schema={sample.schema}
				displayMode={'records'}
				data={sample.data}
				highlighted={[/^\$\['ingredients']\[[0-9]+]\['name']$/]}
				onToggle={action('onToggle')}
			/>
		</div>
	))
	.addWithInfo('Avro viewer', () => (
		<div style={{ height: 500 }}>
			<IconsProvider defaultIcons={icons} />
			<AvroViewer />
		</div>
	));
