import React from 'react';
import repeat from 'lodash/repeat';
import cloneDeep from 'lodash/cloneDeep';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import ObjectViewer from './ObjectViewer.component';
import Icon from '../Icon';
import IconsProvider from '../IconsProvider';
import TooltipTrigger from '../TooltipTrigger';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-chain': talendIcons['talend-chain'],
	'talend-check': talendIcons['talend-check'],
	'talend-warning': talendIcons['talend-warning'],
};

const schema = new Map();
schema.set('business_id', 'integer').set('name', 'CAFE_NAME').set('rating', 'integer');
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
const selectedJsonpath = "$[0]['attributes']";
const showType = true;

const longFieldData = [
	{
		lorem: {
			text:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		},
		Ipsum:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
		longWord:
			'ItisalongestablishedfactthatareaderwillbedistractedbythereadablecontentofapagewhenlookingatitslayoutThepointofusingLoremIpsumisthatithasamoreorlessnormaldistributionoflettersasopposedtousingContentherecontentherepublishingpackagesandwebpageeditorsnowweb',
		isTrue: true,
	},
];

const moreComplexDataShape = [
	{
		date: '2017-05-05T11:57:09 -02:00',
		order_id: '5c24d9283f1b4b2eef6d7006',
		index: 0,
		address: {
			number: 696,
			street: 'Livonia Avenue',
			city: 'Ryderwood',
			state: 'Palau',
		},
		products: [
			{
				id: 0,
				name: 'adipisicing',
			},
		],
	},
	{
		date: '2018-07-27T04:51:50 -02:00',
		order_id: '5c24d928d1b4a945677ba565',
		index: 1,
		address: {
			number: 361,
			street: 'Classon Avenue',
			city: 'Macdona',
			state: 'New Jersey',
		},
		products: [
			{
				id: 0,
				name: 'minim',
			},
		],
	},
	{
		date: '2017-10-08T11:59:08 -02:00',
		order_id: '5c24d9289b8a2e6fde1696c5',
		index: 2,
		// IMPORTANT here is the key that is not present in other objects
		phoneNumber: 'phoneNumber',
		address: {
			number: 226,
			street: 'Fane Court',
			city: 'Trail',
			state: 'California',
		},
		products: [
			{
				id: 0,
				name: 'eiusmod',
			},
			{
				id: 1,
				name: 'eu',
			},
			{
				id: 2,
				name: 'voluptate',
			},
			{
				id: 3,
				name: 'exercitation',
			},
		],
	},
	{
		date: '2014-11-09T01:30:23 -01:00',
		order_id: '5c24d928b6b9f3095fd9bc86',
		index: 3,
		address: {
			number: 248,
			street: 'Division Avenue',
			city: 'Southview',
			state: 'Colorado',
		},
		products: [
			{
				id: 0,
				name: 'incididunt',
			},
			{
				id: 1,
				name: 'dolore',
			},
		],
	},
	{
		date: '2015-11-02T04:14:05 -01:00',
		order_id: '5c24d92800a153ae339e8e95',
		index: 4,
		address: {
			number: 732,
			street: 'Foster Avenue',
			city: 'Bancroft',
			state: 'Nebraska',
		},
		products: [
			{
				id: 0,
				name: 'esse',
			},
			{
				id: 1,
				name: 'Lorem',
			},
			{
				id: 2,
				name: 'voluptate',
			},
		],
	},
	{
		date: '2015-01-29T04:17:48 -01:00',
		order_id: '5c24d92876c4d51ed004f4d1',
		index: 5,
		address: {
			number: 241,
			street: 'Newel Street',
			city: 'Bend',
			state: 'New York',
		},
		products: [
			{
				id: 0,
				name: 'aliqua',
			},
			{
				id: 1,
				name: 'minim',
			},
		],
	},
	{
		date: '2018-10-04T05:12:41 -02:00',
		order_id: '5c24d928bff980ca3f12eabe',
		index: 6,
		address: {
			number: 893,
			street: 'Revere Place',
			city: 'Elliston',
			state: 'South Dakota',
		},
		products: [
			{
				id: 0,
				name: 'proident',
				// IMPORTANT here is the object in nested array that contain one more key
				price: 20,
			},
			{
				id: 1,
				name: 'ullamco',
			},
			{
				id: 2,
				name: 'do',
			},
			{
				id: 3,
				name: 'veniam',
			},
			{
				id: 4,
				name: 'tempor',
			},
		],
	},
];

const callbacks = {
	onSelect: action('onSelect'),
	onSubmit: action('onSubmit'),
	onChange: action('onChange'),
	onToggle: action('onToggle'),
	onToggleAllSiblings: action('onToggleAllSiblings'),
};

const handler = {
	edited: ["$[0]['int']"],
	opened: ['$', '$[0]', "$[0]['attributes']"],
	...callbacks,
};

const handlerHighlight = {
	edited: ["$[0]['int']"],
	opened: ['$', '$[0]', "$[0]['attributes']"],
	...callbacks,
};

const openedNativeTypeHandler = {
	edited: [],
	opened: ['$', '$[0]'],
	...callbacks,
};

const rootOpenedTypeHandler = {
	edited: [],
	opened: ['$', '$[0]'],
	...callbacks,
};

const withTagOnly = (
	<span className="label label-default" style={{ marginLeft: '10px' }}>
		REUSE
	</span>
);

const withTagAndLink = (
	<span style={{ marginLeft: '10px' }}>
		<span className="label label-info">REPLACE</span>
		<TooltipTrigger label="link to artifact" tooltipPlacement="right">
			<a href="">
				<Icon name="talend-chain" style={{ marginLeft: '10px', verticalAlign: 'text-bottom' }} />
			</a>
		</TooltipTrigger>
	</span>
);

const withInfo = (
	<span style={{ marginLeft: '10px', color: '#f0ad4e' }}>
		<Icon name="talend-warning" style={{ verticalAlign: 'text-bottom' }} />
		<span style={{ verticalAlign: 'text-bottom' }}>
			Command has been executed but with warnings
		</span>
	</span>
);

const handlerTags = {
	edited: ["$[0]['int']"],
	opened: ['$', '$[0]', "$[0]['attributes']"],
	tagged: {
		'$[0]': withTagOnly,
		"$[0]['attributes']": withTagAndLink,
		"$[0]['name']": withTagAndLink,
		"$[0]['rating']": withInfo,
		"$[0]['null_value']": withTagOnly,
		"$[0]['location']": withInfo,
	},
	...callbacks,
};

const stories = storiesOf('Data/Tree/DataTreeViewer', module);

stories
	.add('tree default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} {...handlerHighlight} />
		</div>
	))
	.add('array tree with datetime', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={dateTimeData}
				{...rootOpenedTypeHandler}
				showType={showType}
			/>
		</div>
	))
	.add('primitive array tree', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={primitiveArray} {...rootOpenedTypeHandler} />
		</div>
	))
	.add('tree with hightlighting', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={data}
				{...handlerHighlight}
				selectedJsonpath={selectedJsonpath}
			/>
		</div>
	))
	.add('tree with hightlighting and type', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={data}
				{...handlerHighlight}
				selectedJsonpath={selectedJsonpath}
				showType={showType}
			/>
		</div>
	))
	.add('tree with labels', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={data}
				rootLabel="cafesDataset"
				tupleLabel="Record"
				showType={showType}
				{...openedNativeTypeHandler}
			/>
		</div>
	))
	.add('tree without rootLabel', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} tupleLabel="Record" />
		</div>
	))
	.add('tree with very large root label', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={data}
				rootLabel={veryLongDatasetLabel}
				tupleLabel="Record"
				{...openedNativeTypeHandler}
			/>
		</div>
	))
	.add('tree with injected elements', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} {...handlerTags} />
		</div>
	))
	.add('tree with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} {...handler} />
		</div>
	))
	.add('list default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} displayMode="list" />
		</div>
	))
	.add('list with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} displayMode="list" {...handler} />
		</div>
	))
	.add('table default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} displayMode="table" title="Table data" />
		</div>
	))
	.add('table with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={data}
				{...handler}
				displayMode="table"
				title="Table data"
			/>
		</div>
	))
	.add('table with long text', () => {
		const enhancedData = cloneDeep(data);
		enhancedData[0].name = repeat(clubName, 10);
		enhancedData[1].name = repeat(clubName, 5);
		enhancedData[0].category = repeat(clubCategory, 10);
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				<ObjectViewer
					id="my-viewer"
					data={enhancedData}
					{...handler}
					displayMode="table"
					title="Table data"
				/>
			</div>
		);
	})
	.add('flat default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} displayMode="flat" title="Table data" />
		</div>
	))
	.add('flat default with schema', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={{ dataset: data, schema }}
				displayMode="flat"
				title="Table data"
			/>
		</div>
	))
	.add('flat with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={data} {...handler} displayMode="flat" title="Table data" />
		</div>
	))
	.add('flat with complex nested data', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id="my-viewer"
				data={moreComplexDataShape}
				{...handler}
				displayMode="flat"
				title="Table data"
			/>
		</div>
	))
	.add('tree with a long field', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id="my-viewer" data={longFieldData} {...handlerHighlight} />
		</div>
	));
