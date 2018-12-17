import React from 'react';
import repeat from 'lodash/repeat';
import cloneDeep from 'lodash/cloneDeep';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { ObjectViewer, Icon, IconsProvider, TooltipTrigger } from '../src/index';

const icons = {
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-chain': talendIcons['talend-chain'],
	'talend-check': talendIcons['talend-check'],
	'talend-warning': talendIcons['talend-warning'],
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
const selectedJsonpath = "$[0]['attributes']";
const showType = true;

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

const stories = storiesOf('ObjectViewer', module);

stories
	.add('tree default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} {...handlerHighlight} />
		</div>
	))
	.add('array tree with datetime', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id={'my-viewer'}
				data={dateTimeData}
				{...rootOpenedTypeHandler}
				showType={showType}
			/>
		</div>
	))
	.add('primitive array tree', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={primitiveArray} {...rootOpenedTypeHandler} />
		</div>
	))
	.add('tree with hightlighting', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id={'my-viewer'}
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
				id={'my-viewer'}
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
				id={'my-viewer'}
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
			<ObjectViewer id={'my-viewer'} data={data} tupleLabel="Record" />
		</div>
	))
	.add('tree with very large root label', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer
				id={'my-viewer'}
				data={data}
				rootLabel={veryLongDatasetLabel}
				tupleLabel="Record"
				{...openedNativeTypeHandler}
			/>
		</div>
	))
	.add('tree with injected elements', () => {
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				<ObjectViewer id={'my-viewer'} data={data} {...handlerTags} />
			</div>
		);
	})
	.add('tree with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} {...handler} />
		</div>
	))
	.add('list default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} displayMode="list" />
		</div>
	))
	.add('list with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} displayMode="list" {...handler} />
		</div>
	))
	.add('table default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} displayMode="table" />
		</div>
	))
	.add('table with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} {...handler} displayMode="table" />
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
				<ObjectViewer id={'my-viewer'} data={enhancedData} {...handler} displayMode="table" />
			</div>
		);
	})
	.add('flat default', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} displayMode="flat" />
		</div>
	))
	.add('flat default with schema', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={{ dataset: data, schema }} displayMode="flat" />
		</div>
	))
	.add('flat with handler', () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<ObjectViewer id={'my-viewer'} data={data} {...handler} displayMode="flat" />
		</div>
	));
