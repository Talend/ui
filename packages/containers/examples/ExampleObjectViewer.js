import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { ObjectViewer } from '../src';

const veryLongCafeName = "Betty's Cafe witha  veryyyyyyy veryyyyyyyyyy looong name";
const data = [
	{
		business_id: 0,
		name: `${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName}`,
		category: 'Club',
		rating: 4,
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
		name: `${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName} ${veryLongCafeName}`,
		category: 'Club',
		rating: 4,
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

const selectedJsonpath = "$[0]['name']";

const ExampleObjectViewer = {
	dataModel: () => (
		<div>
			<IconsProvider />
			<ObjectViewer displayMode="model" data={dataModelFields} />
		</div>
	),
	default: () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} />
		</div>
	),
	'JsonLike with rootLabel': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} rootLabel="Dataset des cafés" />
		</div>
	),
	'JsonLike with hightlight': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} selectedJsonpath={selectedJsonpath} />
		</div>
	),
	'JsonLike with types': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} showType />
		</div>
	),
	'JsonLike with types and tuple name': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} showType tupleLabel="Record" />
		</div>
	),
	'list default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="list" openFirst />
		</div>
	),
	'table default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="table" />
		</div>
	),
	'flat default': () => (
		<div>
			<IconsProvider />
			<ObjectViewer data={data} displayMode="flat" />
		</div>
	),
};
export default ExampleObjectViewer;
