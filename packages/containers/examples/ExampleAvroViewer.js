import React from 'react';
import AvroViewer from '../src/AvroViewer';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
};

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

const props = {
	sample,
	modelItemMenu,
	qualityMenu,
};

const ExampleAvroViewer = {
	default: () => (
		<div>
			<IconsProvider />
			<AvroViewer {...props} />
		</div>
	),
};
