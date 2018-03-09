import React from 'react';
import repeat from 'lodash/repeat';
import cloneDeep from 'lodash/cloneDeep';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import PropTypes from 'prop-types';

import { Action, ObjectViewer, IconsProvider } from '../src/index';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
};

const schema = new Map();
schema
	.set('business_id', 'integer')
	.set('name', 'CAFE_NAME')
	.set('rating', 'integer');
const veryLongDatasetLabel =
	"Dataset of something that I cant't imagine; Dataset of something that I cant't imagine; Dataset of something that I cant't imagine";
const clubName = "Betty's Cafe";
const clubCategory = 'Club category mixology hipster';

const dateTimeData = [
	{
		birth: '1985-03-01T12:19:58Z',
		birthday: '1985-03-01',
		birthtime: '12:19:58',
		notCompliantString: '1985-03-01 12:19:58Z',
	},
];

const data = [
	{
		business_id: 0,
		name: clubName,
		category: clubCategory,
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
		name: clubName,
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
const primitiveArray = [1, 2, 3];

const handler = {
	edited: ["$[0]['int']"],
	opened: ['$', '$[0]', "$[0]['attributes']"],
	onClick: action('onClick'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onToggle: action('onToggle'),
};

let selectedJsonpath = "$[0]['attributes']";
const showType = true;

const handlerHighlight = {
	edited: ["$[0]['int']"],
	opened: ['$', '$[0]', "$[0]['attributes']"],
	onClick: action('onClick'),
	onSelect: (e, jsonpath) => {
		selectedJsonpath = jsonpath;
		action('onSelect');
	},
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onToggle: action('onToggle'),
};

const openedNativeTypeHandler = {
	edited: [],
	opened: ['$', '$[0]'],
	onClick: action('onClick'),
	onSelect: (e, jsonpath) => {
		selectedJsonpath = jsonpath;
		action('onSelect');
	},
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onToggle: action('onToggle'),
};

const rootOpenedTypeHandler = {
	edited: [],
	opened: ['$', '$[0]'],
	onClick: action('onClick'),
	onSelect: (e, jsonpath) => (selectedJsonpath = jsonpath),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onToggle: action('onToggle'),
};

const stories = storiesOf('ObjectViewer', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

const dataModelFields = [
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
			type: 'object',
		},
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
					type: 'object',
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
	{
		name: 'ratings',
		doc: 'Ratings',
		type: {
			type: 'object',
		},
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
];
function QualityMenu(props) {
	function filterClick(e) {
		action('onFilterClick')(e, { ...props, action: 'filter' });
	}
	function removeClick(e) {
		action('onRemoveClick')(e, { ...props, action: 'remove' });
	}

	const { type } = props;
	const menuStyle = {
		listStyle: 'none',
		padding: 0,
		margin: 0,
	};
	return (
		<ul style={menuStyle}>
			<li><Action link label={`Filter ${type} values`} onClick={filterClick} autoFocus /></li>
			<li><Action link label={`Remove ${type} values`} onClick={removeClick} /></li>
		</ul>
	);
}
QualityMenu.propTypes = {
	type: PropTypes.string,
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

stories
	.addWithInfo('data model', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				displayMode="model"
				data={dataModelFields}
				menu={modelItemMenu}
				onSelect={action('onSelect')}
				onToggle={action('onToggle')}
				opened={['[3]', '[3][3]']}
				quality={{
					key: '@talend-quality@',
					menu: qualityMenu,
				}}
			/>
			<h2>TODO</h2>
			<ul>
				<li>Accessibility : navigate from item to item with up/down keys</li>
				<li>Code duplication : to manage focus accessibility in menus, we had to implement some code in Item menu (that use Action) and in QualityCircles (that use PieChartButton). The code is the same but in 2 places, let's try to remove this duplication</li>
				<li>Container : pass all extra props (not accepted by opther object viewers) or let's not integrate it into ObjectViewer (but this solution would duplicate toggle code).</li>
			</ul>
		</div>
	))
	.addWithInfo('tree default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handlerHighlight} />
		</div>
	))
	.addWithInfo('array tree with datetime', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={dateTimeData} {...rootOpenedTypeHandler} showType={showType} />
		</div>
	))
	.addWithInfo('primitive array tree', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={primitiveArray} {...rootOpenedTypeHandler} />
		</div>
	))
	.addWithInfo('tree with hightlighting', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handlerHighlight} selectedJsonpath={selectedJsonpath} />
		</div>
	))
	.addWithInfo('tree with hightlighting and type', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				data={data}
				{...handlerHighlight}
				selectedJsonpath={selectedJsonpath}
				showType={showType}
			/>
		</div>
	))
	.addWithInfo('tree with labels', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				data={data}
				rootLabel="cafesDataset"
				tupleLabel="Record"
				showType={showType}
				{...openedNativeTypeHandler}
			/>
		</div>
	))
	.addWithInfo('tree without rootLabel', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} tupleLabel="Record" />
		</div>
	))
	.addWithInfo('tree with very large root label', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				data={data}
				rootLabel={veryLongDatasetLabel}
				tupleLabel="Record"
				{...openedNativeTypeHandler}
			/>
		</div>
	))
	.addWithInfo('tree with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} />
		</div>
	))
	.addWithInfo('list default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="list" />
		</div>
	))
	.addWithInfo('list with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="list" {...handler} />
		</div>
	))
	.addWithInfo('table default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="table" />
		</div>
	))
	.addWithInfo('table with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} displayMode="table" />
		</div>
	))
	.addWithInfo('table with long text', () => {
		const enhancedData = cloneDeep(data);
		enhancedData[0].name = repeat(clubName, 10);
		enhancedData[1].name = repeat(clubName, 5);
		enhancedData[0].category = repeat(clubCategory, 10);
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				<ObjectViewer data={enhancedData} {...handler} displayMode="table" />
			</div>
		);
	})
	.addWithInfo('flat default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} displayMode="flat" />
		</div>
	))
	.addWithInfo('flat default with schema', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={{ dataset: data, schema }} displayMode="flat" />
		</div>
	))
	.addWithInfo('flat with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer data={data} {...handler} displayMode="flat" />
		</div>
	));
