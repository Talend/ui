import React from 'react';
import times from 'lodash/times';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useTranslation } from 'react-i18next';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import Badge from '@talend/react-components/lib/Badge';
import FacetedSearch from '../src';
import { FacetedSearchIcon } from '../src/components/FacetedSearchIcon';
import { BadgeFacetedProvider } from '../src/components/context/badgeFaceted.context';
import { BadgesGenerator } from '../src/components/BadgesGenerator';
import { createBadgesDict, getBadgesFromDict } from '../src/dictionary/badge.dictionary';

import {
	badgeConnectionType,
	badgeName,
	badgeConnectionName,
	badgeAuthor,
	badgeAll,
	badgePrice,
	badgeValid,
	badgeEmpty,
	badgeInvalid,
	badgeEnumWithLotOfValues,
	badgeTags,
	badgeWithVeryLongName,
	badgeTextAsCustomAttribute,
	badgeEnumsAsCustomAttribute,
	badgeTextAsCategory,
	badgeEmptyLabel,
	badgePriceAsCustomAttribute,
	badgeCreationDate,
} from './badgesDefinitions';

const badgesDefinitions = [
	badgeAll,
	badgeName,
	badgeConnectionName,
	badgeAuthor,
	badgeConnectionType,
	badgeTags,
	badgePrice,
	badgeValid,
	badgeEmpty,
	badgeInvalid,
	badgeCreationDate,
];
const lotsOfBadgesDefinitions = [];
let i = 0;
while (i < 50) {
	lotsOfBadgesDefinitions.push(badgeName);
	i += 1;
}

const callbacks = {
	getTags: () =>
		new Promise(resolve =>
			setTimeout(resolve, 2000, [
				'clean',
				'production',
				'last chunk',
				'salesforce',
				'outdated',
				'extracted',
				'security',
				'in processing',
				'deep learning',
				'sql',
				'cluster',
				'visualization',
				'analytics',
				'users',
				'warehouse',
				'api',
			]),
		),
};

const badgesWithAll = {
	badges: [
		{
			properties: {
				attribute: 'all',
				initialOperatorOpened: false,
				initialValueOpened: false,
				label: 'All',
				operator: { label: 'Contains', name: 'containsIgnoreCase', iconName: 'contains' },
				operators: [],
				type: 'text',
				value: 'test',
			},
			metadata: {
				isAvailableForFacetList: false,
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['containsIgnoreCase'],
				badgeId: 'all-b6c04e3d-1d72-4aca-9565-09d206f76d88',
				isInCreation: false,
			},
		},
	],
};

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
			<style>
				{`
				#talend-pie-charts path[class^='ti-slice-'] {
					fill: #C6C6C6;
				}
				#talend-pie-charts path.ti-slice-right {
					fill: currentColor;
				}
				.tc-badge-slider-form .invalid {
					color: #EA8330;
				}
				.tc-badge-slider-form .valid {
					color: #82BD41;
				}
				.tc-badge-slider-form .empty {
					color: #202020;
				}
				`}
			</style>
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
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							callbacks={callbacks}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('initialized', () => (
		<div>
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
							callbacks={callbacks}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('initialized with a badge which is not visible in the list', () => (
		<div>
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							badgesFaceted={badgesWithAll}
							callbacks={callbacks}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('colored', () => (
		<div>
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							badgesFaceted={set(
								cloneDeep(badgesFaceted),
								'badges[0].properties.displayType',
								Badge.TYPES.VALUE,
							)}
							onSubmit={action('onSubmit')}
							callbacks={callbacks}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	))
	.add('with special chars', () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		const badge = cloneDeep(badgesFaceted.badges[0]);
		Object.assign(badge.properties, {
			value: '  text  ',
			type: 'text',
			displayType: Badge.TYPES.PATTERN,
		});
		return (
			<div>
				<BadgeFacetedProvider value={{}}>
					<BadgesGenerator
						badges={[badge]}
						badgesDictionary={badgesDictionary}
						getBadgeFromDict={getBadgesFromDict}
						t={t}
					/>
				</BadgeFacetedProvider>
			</div>
		);
	})
	.add('date picker', () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		const badge = cloneDeep(badgesFaceted.badges[0]);
		Object.assign(badge.properties, {
			value: Date.now(),
			type: 'date',
		});
		return (
			<div>
				<BadgeFacetedProvider value={{}}>
					<BadgesGenerator
						badges={[badge]}
						badgesDictionary={badgesDictionary}
						getBadgeFromDict={getBadgesFromDict}
						t={t}
					/>
				</BadgeFacetedProvider>
			</div>
		);
	})
	.add('read only', () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		return (
			<div>
				<BadgeFacetedProvider value={{}}>
					<BadgesGenerator
						badges={[
							set(cloneDeep(badgesFaceted.badges[0]), 'properties.readOnly', true),
							set(cloneDeep(badgesFaceted.badges[0]), 'properties.removable', false),
						]}
						badgesDictionary={badgesDictionary}
						getBadgeFromDict={getBadgesFromDict}
						t={t}
					/>
				</BadgeFacetedProvider>
			</div>
		);
	})
	.add('with external state', () => {
		const [state, setState] = React.useState(badgesFaceted);
		const onSubmit = React.useCallback(
			(_, badges) => setState(previousState => ({ ...previousState, badges })),
			[setState],
		);

		return (
			<div>
				<button onClick={() => setState(badgesFaceted)}>Reset state</button>
				<FacetedSearch.Faceted id="my-faceted-search">
					{currentFacetedMode =>
						(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
							<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
						)) ||
						(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
							<FacetedSearch.BasicSearch
								badgesDefinitions={badgesDefinitions}
								badgesFaceted={state}
								onSubmit={onSubmit}
								callbacks={callbacks}
							/>
						))
					}
				</FacetedSearch.Faceted>
			</div>
		);
	})

	.add('without label or operator button', () => (
		<div>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={badgesDefinitions}
					badgesFaceted={set(cloneDeep(badgesFaceted), 'badges[0].properties.label', '')}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with lots of badges definitions', () => (
		<div style={{ height: '5.5rem' }}>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={lotsOfBadgesDefinitions}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with badge with very long name', () => (
		<div style={{ height: '5.5rem' }}>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[
						badgeWithVeryLongName,
						badgeConnectionType,
						badgeName,
						badgePrice,
					]}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search in a badge with a lot of values', () => (
		<div style={{ height: '5.5rem' }}>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[badgeEnumWithLotOfValues]}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with badges categories', () => (
		<div style={{ height: '5.5rem' }}>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[
						badgeConnectionType,
						badgeName,
						badgePrice,
						badgeTags,
						badgeTextAsCustomAttribute,
						badgePriceAsCustomAttribute,
						badgeEnumsAsCustomAttribute,
						...times(2, () => badgeTextAsCategory),
					]}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	))
	.add('basic search with a empty label badge', () => (
		<div style={{ height: '5.5rem' }}>
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={[badgeName, badgeEmptyLabel]}
					onSubmit={action('onSubmit')}
					callbacks={callbacks}
				/>
			</FacetedSearch.Faceted>
		</div>
	));
