import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import FacetedSearch from '../src';
import { FacetedSearchIcon } from '../src/components/FacetedSearchIcon';

const badgeName = {
	properties: {
		attribute: 'name',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Name',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: ['contains', 'equals', 'notEquals'],
	},
};

const badgeConnectionType = {
	properties: {
		attribute: 'connection.type',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Connection type',
		operator: {},
		operators: [],
		type: 'checkbox',
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
	},
};

const badgePrice = {
	properties: {
		attribute: 'price',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Price',
		operator: {},
		operators: [],
		type: 'number',
	},
	metadata: {
		badgePerFacet: 'N',
		entitiesPerBadge: '1',
		operators: [
			'equals',
			'notEquals',
			'greaterThan',
			'greaterThanOrEquals',
			'lessThan',
			'lessThanOrEquals',
		],
	},
};

const badgesDefinitions = [badgeName, badgeConnectionType, badgePrice];

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
	));
