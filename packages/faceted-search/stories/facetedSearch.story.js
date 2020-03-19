import React from 'react';
import { times } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import FacetedSearch from '../src';
import { FacetedSearchIcon } from '../src/components/FacetedSearchIcon';

import {
	badgeConnectionType,
	badgeName,
	badgePrice,
	badgeEnumWithLotOfValues,
	badgeWithVeryLongName,
	badgeTextAsCustomAttribute,
	badgeEnumsAsCustomAttribute,
	badgeTextAsCategory,
	badgeEmptyLabel,
} from './badgesDefinitions.story';

const badgesDefinitions = [badgeName, badgeConnectionType, badgePrice];
const lotsOfBadgesDefinitions = [];
let i = 0;
while (i < 50) {
	lotsOfBadgesDefinitions.push(badgeName);
	i += 1;
}

const badgesFaceted = {
	badges: [
		{
			properties: {
				attribute: 'connection.type',
				initialOperatorOpened: false,
				initialValueOpened: false,
				label: 'Connection Type',
				operator: {
					label: 'In',
					name: 'in',
				},
				operators: [
					{
						label: 'In',
						name: 'in',
					},
				],
				type: 'checkbox',
				value: [
					{
						id: 'amazon_s3',
						label: 'Amazon S3',
						checked: true,
					},
				],
			},
			metadata: {
				badgePerFacet: '1',
				entitiesPerBadge: 'N',
				values: [
					{ id: 'amazon_s3', label: 'Amazon S3' },
					{ id: 'hdfs', label: 'HDFS' },
					{ id: 'kafka', label: 'Kafka' },
					{ id: 'localcon', label: 'Local connection' },
					{ id: 'salesforce', label: 'Salesforce' },
					{ id: 'aws_kinesis', label: 'AWS kinesis' },
				],
				operators: ['in'],
				badgeId: 'connection.type-9f0e5bc7-c687-4198-9635-d0fc7724dfd1',
				isInCreation: false,
			},
		},
	],
};

const paddingLeft = { paddingLeft: '10px' };

storiesOf('FacetedSearch', module)
	.addDecorator(story => (
		<div style={{ ...paddingLeft }}>
			<IconsProvider />
			<h1>Faceted Search</h1>
			{story()}
		</div>
	))
	.add('icon default, active and loading', () => (
		<div>
			<div style={{ display: 'flex' }}>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon loading onClick={action('onClick')} />
				</span>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon active onClick={action('onClick')} />
				</span>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon onClick={action('onClick')} />
				</span>
			</div>
		</div>
	))
	.add('default', () => (
		<div>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('initialized', () => (
		<div>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							badgesFaceted={badgesFaceted}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with lots of badges definitions', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={lotsOfBadgesDefinitions}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with badge with very long name', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[badgeWithVeryLongName, badgeConnectionType, badgeName, badgePrice]}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search in a badge with a lot of values', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[badgeEnumWithLotOfValues]}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with badges categories', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[
						badgeConnectionType,
						badgeName,
						badgePrice,
						badgeTextAsCustomAttribute,
						badgeEnumsAsCustomAttribute,
						...times(2, () => badgeTextAsCategory),
					]}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with a empty label badge', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[
						badgeName,
						badgeEmptyLabel,
					]}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	));
