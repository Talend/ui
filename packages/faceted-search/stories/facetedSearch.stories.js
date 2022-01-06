import React from 'react';
import { within, userEvent } from '@storybook/testing-library';
import times from 'lodash/times';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { action } from '@storybook/addon-actions';
import { useTranslation } from 'react-i18next';
import Badge from '@talend/react-components/lib/Badge';
import FacetedSearch from '../src';
import { FacetedSearchIcon } from '../src/components';
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

export default {
	component: FacetedSearch.Faceted,
	parameters: {
		docs: {
			description: {
				component:
					'Faceted search is a technique that involves augmenting traditional search techniques with a faceted navigation system, allowing users to narrow down search results by applying multiple filters based on faceted classification of the items. The user can look for any value, even if the field is not currently visible.',
			},
		},
	},
	decorators: [
		(Story, context) => (
			<div>
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
				<Story {...context} />
			</div>
		),
	],
};

export const Default = {
	render: () => (
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
	),
};

export const IconDefaultActiveAndLoading = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem' }}>
			<div>
				<FacetedSearchIcon loading onClick={action('onClick')} />
			</div>
			<div>
				<FacetedSearchIcon active onClick={action('onClick')} />
			</div>
			<div>
				<FacetedSearchIcon onClick={action('onClick')} />
			</div>
		</div>
	),
};

export const Initialized = {
	render: () => (
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
	),
};

export const InitializedWithABadgeWhichIsNotVisibleInTheList = {
	render: () => (
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
	),
};

export const Colored = {
	render: () => (
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
	),
};

export const WithSpecialChars = {
	render: () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		const badge = cloneDeep(badgesFaceted.badges[0]);
		Object.assign(badge.properties, {
			value: '  text  ',
			type: 'text',
			displayType: Badge.TYPES.PATTERN,
		});
		return (
			<BadgeFacetedProvider value={{}}>
				<BadgesGenerator
					badges={[badge]}
					badgesDictionary={badgesDictionary}
					getBadgeFromDict={getBadgesFromDict}
					t={t}
				/>
			</BadgeFacetedProvider>
		);
	},
};

export const DatePicker = {
	render: () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		const badge = cloneDeep(badgesFaceted.badges[0]);
		Object.assign(badge.properties, {
			value: Date.now(),
			type: 'date',
		});
		return (
			<BadgeFacetedProvider value={{}}>
				<BadgesGenerator
					badges={[badge]}
					badgesDictionary={badgesDictionary}
					getBadgeFromDict={getBadgesFromDict}
					t={t}
				/>
			</BadgeFacetedProvider>
		);
	},
};

export const ReadOnly = {
	render: () => {
		const { t } = useTranslation();
		const badgesDictionary = createBadgesDict();
		return (
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
		);
	},
};

export const WithExternalState = {
	render: () => {
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
	},
};

export const WithoutLabelOrOperatorButton = {
	render: () => (
		<FacetedSearch.Faceted id="my-faceted-search">
			<FacetedSearch.BasicSearch
				badgesDefinitions={badgesDefinitions}
				badgesFaceted={set(cloneDeep(badgesFaceted), 'badges[0].properties.label', '')}
				onSubmit={action('onSubmit')}
				callbacks={callbacks}
			/>
		</FacetedSearch.Faceted>
	),
};

export const BasicSearchWithLotOfBadgeDefinitions = {
	render: () => (
		<FacetedSearch.Faceted id="my-faceted-search">
			<FacetedSearch.BasicSearch
				badgesDefinitions={lotsOfBadgesDefinitions}
				onSubmit={action('onSubmit')}
				callbacks={callbacks}
			/>
		</FacetedSearch.Faceted>
	),
	play: async ({ canvasElement }) => {
		await userEvent.type(within(canvasElement).getByRole('searchbox'), 'lorem ipsum');
	},
};

export const BasicSearchWithBadgeWithVeryLongName = {
	render: () => (
		<FacetedSearch.Faceted id="my-faceted-search">
			<FacetedSearch.BasicSearch
				badgesDefinitions={[badgeWithVeryLongName, badgeConnectionType, badgeName, badgePrice]}
				onSubmit={action('onSubmit')}
				callbacks={callbacks}
			/>
		</FacetedSearch.Faceted>
	),
	play: async ({ canvasElement }) => {
		await userEvent.type(within(canvasElement).getByRole('searchbox'), 'lorem ipsum');
	},
};

export const BasicSearchInABadgeWithALotOfValues = {
	render: () => (
		<FacetedSearch.Faceted id="my-faceted-search">
			<FacetedSearch.BasicSearch
				badgesDefinitions={[badgeEnumWithLotOfValues]}
				onSubmit={action('onSubmit')}
				callbacks={callbacks}
			/>
		</FacetedSearch.Faceted>
	),
};

export const BasicSearchWithBadgesCategories = {
	render: () => (
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
	),
};

export const BasicSearchWithAnEmptyLabelBadge = {
	render: () => (
		<FacetedSearch.Faceted id="my-faceted-search">
			<FacetedSearch.BasicSearch
				badgesDefinitions={[badgeName, badgeEmptyLabel]}
				onSubmit={action('onSubmit')}
				callbacks={callbacks}
			/>
		</FacetedSearch.Faceted>
	),
};
