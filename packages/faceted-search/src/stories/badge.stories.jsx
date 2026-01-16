import { Badge } from '@talend/react-components';
import { useTranslation } from 'react-i18next';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

import FacetedSearch from '../';
import { BadgeFacetedProvider } from '../components/context/badgeFaceted.context';
import { BadgesGenerator } from '../components/BadgesGenerator';
import { createBadgesDict, getBadgesFromDict } from '../dictionary/badge.dictionary';

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
					{
						id: 'hdfs',
						label: 'HDFS',
						checked: true,
					},
					{
						id: 'localcon',
						label: 'Local connection',
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
	title: 'Faceted search/Badge',
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
				<Story {...context} />
			</div>
		),
	],
};

export const WithSpecialChars = () => {
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
};

export const DatePicker = () => {
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
};

export const ReadOnly = () => {
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
};
