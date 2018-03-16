import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { ObjectViewer, IconsProvider } from '../src/index';
import DefaultDateRenderer from '../src/ObjectViewer/AvroRenderer/DefaultDateRenderer.component';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
};

const stories = storiesOf('AvroViewer', module);

const simpleJson = [
	{
		business_id: 0,
		name: "Betty's Cafe",
		category: 'Club category mixology hipster',
		rating: 4,
		null_value: null,
		num_of_reviews: 2647,
		attributes: {
			good_for: {
				dessert: false,
				kids: true,
				drinks: false,
				breakfast: false,
				lunch: false,
				dinner: true,
			},
			parking: { lot: false, valet: false, garage: false },
			take_reservations: true,
			noise_level: 'quiet',
		},
		location: {
			zipType: 'STANDARD',
			zip: 72132,
			decommisioned: false,
			taxReturnsFiled: 1400,
			location: 'NA- US - AR - REDFIELD',
			estimatedPopulation: 2653,
			locationType: 'PRIMARY',
			totalWages: 56190766,
			state: 'AR',
			longitude: -92.18,
			latitude: 34.44,
			city: 'REDFIELD',
		},
	},
	{
		business_id: 1,
		name: "Betty's Cafe",
		category: 'Club',
		rating: 4,
		null_value: null,
		num_of_reviews: 2647,
		attributes: {
			good_for: {
				dessert: false,
				kids: true,
				drinks: false,
				breakfast: false,
				lunch: false,
				dinner: true,
			},
			parking: { lot: false, valet: false, garage: false },
			take_reservations: true,
			noise_level: 'quiet',
		},
		location: {
			zipType: 'STANDARD',
			zip: 72132,
			decommisioned: false,
			taxReturnsFiled: 1400,
			location: 'NA- US - AR - REDFIELD',
			estimatedPopulation: 2653,
			locationType: 'PRIMARY',
			totalWages: 56190766,
			state: 'AR',
			longitude: -92.18,
			latitude: 34.44,
			city: 'REDFIELD',
		},
	},
	{
		business_id: 2,
		name: "Nancy's Club",
		category: 'Club',
		rating: 2,
		null_value: null,
		num_of_reviews: 3779,
		attributes: {
			good_for: {
				dessert: false,
				kids: true,
				drinks: false,
				breakfast: false,
				lunch: false,
				dinner: true,
			},
			parking: { lot: true, valet: true, garage: false },
			take_reservations: true,
			noise_level: 'average',
		},
		location: {
			zipType: 'PO BOX',
			zip: 88221,
			decommisioned: false,
			taxReturnsFiled: 967,
			location: 'NA-US - NM - CARLSBAD',
			estimatedPopulation: 1638,
			locationType: 'PRIMARY',
			totalWages: 37060120,
			state: 'NM',
			longitude: -104.23,
			latitude: 32.4,
			city: 'CARLSBAD',
		},
	},
	{
		business_id: 3,
		name: "Cecelia's Club",
		category: 'Cafe',
		rating: 4,
		null_value: null,
		num_of_reviews: 16547,
		attributes: {
			good_for: {
				dessert: true,
				kids: false,
				drinks: false,
				breakfast: true,
				lunch: false,
				dinner: false,
			},
			parking: { lot: true, valet: true, garage: false },
			take_reservations: false,
			noise_level: 'noisy',
		},
		location: {
			zipType: 'PO BOX',
			zip: 47445,
			decommisioned: false,
			taxReturnsFiled: 123,
			location: 'NA-US - IN - MIDLAND',
			estimatedPopulation: 123,
			locationType: 'PRIMARY',
			totalWages: 456,
			state: 'IN',
			longitude: -87.16,
			latitude: 39.09,
			city: 'MIDLAND',
		},
	},
	{
		business_id: 4,
		name: "Gordon's Bar",
		category: 'Cafe',
		rating: 1,
		null_value: null,
		num_of_reviews: 152,
		attributes: {
			good_for: {
				dessert: false,
				kids: false,
				drinks: true,
				breakfast: true,
				lunch: true,
				dinner: true,
			},
			parking: { lot: true, valet: false, garage: true },
			take_reservations: true,
			noise_level: 'noisy',
		},
		location: {
			zipType: 'STANDARD',
			zip: 65638,
			decommisioned: false,
			taxReturnsFiled: 123,
			location: 'NA- US - MO - DRURY',
			estimatedPopulation: 123,
			locationType: 'PRIMARY',
			totalWages: 456,
			state: 'MO',
			longitude: -92.32,
			latitude: 36.92,
			city: 'DRURY',
		},
	},
];

const schema = [
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
		name: 'date',
		doc: 'Date',
		type: {
			type: 'date',
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
		type: { type: 'array' },
		items: {
			name: 'ingredient',
			type: { type: 'record' },
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
					type: { type: 'record' },
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
								0: 0,
								1: 0,
								'-1': 100,
							},
						},
					],
				},
			],
		},
	},
];
const data = [
	{
		value: {
			id: {
				value: 0,
				quality: 1,
			},
			name: {
				value: 'Nom de la gare',
				quality: 1,
			},
			price: {
				value: 'Code UIC',
				quality: 1,
			},
			date: {
				value: Date.now(),
				quality: 1,
			},
		},
		quality: 1,
	},
	{
		value: {
			id: {
				value: 1,
				quality: 1,
			},
			name: {
				value: 'Aéroport Charles de Gaulle 2 TGV',
				quality: 1,
			},
			price: {
				value: '271494',
				quality: 1,
			},
			date: {
				value: Date.now(),
				quality: 1,
			},
			ingredients: {
				value: [
					{
						value: {
							name: { quality: 1, value: 'brown sugar' },
							amount: { quality: 1, value: 100 },
							unit: { quality: 1, value: 'grams' },
							nested: {
								quality: -1,
								value: {
									poo: { quality: 1, value: 'good' },
									pee: { quality: -1, value: 'lol' },
								},
							},
						},
						quality: -1,
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
	data.push({ ...data[1], id: { value: i, quality: 1 } });
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

const customAvroRenderersIds = {
	date: 'myCustomDateRenderer',
};
const customAvroRenderersRegistry = {
	myCustomDateRenderer: props => {
		let value = props.data.value;
		if (typeof value === 'number') {
			const date = new Date(value);
			value = `Custom renderer, only year - ${date.getFullYear()}`;
		}
		return <span>{value}</span>;
	},
};
function getComponent(componentId) {
	return customAvroRenderersRegistry[componentId];
}

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
		let avroRenderersIds;
		if (this.props.useCustomRenderers) {
			avroRenderersIds = customAvroRenderersIds;
		}
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
						avroRenderersIds={avroRenderersIds}
						displayMode={'records'}
						data={sample.data}
						getComponent={getComponent}
						highlighted={this.state.highlighted}
						schema={sample.schema}
					/>
				</div>
			</div>
		);
	}
}
AvroViewer.propTypes = {
	useCustomRenderers: PropTypes.bool,
};

stories
	.addWithInfo('simple JSON object', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewerWithToggle
				displayMode="generic"
				data={simpleJson}
				onSelect={action('onSelect')}
				onToggle={action('onToggle')}
			/>
		</div>
	))
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
	))
	.addWithInfo('Avro viewer with custom date renderer', () => (
		<div style={{ height: 500 }}>
			<IconsProvider defaultIcons={icons} />
			<AvroViewer useCustomRenderers />
		</div>
	));
