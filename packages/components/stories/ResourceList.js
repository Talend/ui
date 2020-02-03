import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { storiesOf } from '@storybook/react';

import { Icon, ResourceList } from '../src/index';
import IconsProvider from '../src/IconsProvider';

import { collection, simpleCollection } from './ResourcePicker';

export const preparations = [
	{
		id: 0,
		name: 'Chief Marketing Officer',
		createdBy: 'Karson Cartwright',
		path: 'Group/Program/Solution',
	},
	{
		id: 1,
		name: 'Chief Web Technician',
		createdBy: 'Rogers Gutkowski',
		path: 'M/Program/Solution',
	},
	{
		id: 3,
		name: 'Customer Identity Developer',
		createdBy: 'Zoey Jones',
		path: '../Operations/Research/Directives',
	},
	{
		id: 4,
		name: 'Dynamic Response Consultant',
		createdBy: 'Santiago Schmitt Jr.',
		path: 'Quality/Security',
	},
];

export const pipelines = [
	{
		id: 0,
		name: 'Central Factors Facilitator',
		createdBy: 'Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch',
		usedAs: ['source', 'destination'],
	},
	{
		id: 1,
		name: 'Dynamic Solutions Strategist',
		createdBy: 'Earnestine Rath',
		usedAs: ['source'],
	},
	{
		id: 2,
		name: 'International Brand Engineer',
		createdBy: 'Deonte Blick',
		usedAs: ['source', 'destination'],
	},
	{
		id: 3,
		name: 'National Data Planner',
		createdBy: 'Jaron Murray',
		usedAs: ['destination'],
	},
	{
		id: 4,
		name: 'Regional Marketing Liaison',
		createdBy: 'Earnestine Rath',
		usedAs: ['source', 'destination'],
	},
];

export function Preparation({ name, createdBy, path }) {
	const { t } = useTranslation();
	return (
		<div className={'preparation'}>
			<h2>{name}</h2>
			<dl>
				<div>
					<dt>
						<Icon name={'talend-user-circle'} />
						{t('CREATED_BY', { defaultValue: 'Created by' })}
					</dt>
					<dd>{createdBy}</dd>
				</div>
				<div>
					<dt>
						<Icon name={'talend-folder-closed'} />
						<span className={'sr-only'}>{t('Path', { defaultValue: 'Path' })}</span>
					</dt>
					<dd>{path}</dd>
				</div>
			</dl>
		</div>
	);
}

Preparation.propTypes = {
	name: PropTypes.string,
	createdBy: PropTypes.string,
	path: PropTypes.string,
};

export function Pipeline({ name, createdBy, usedAs }) {
	const { t } = useTranslation();
	const joinedItemsMessage = t('JOIN_ITEMS', {
		defaultValue: '{{item1}} and {{item2}}',
		item1: usedAs[0],
		item2: usedAs[1],
	});
	return (
		<div className={'pipeline'}>
			<h2>{name}</h2>
			<dl>
				<div>
					<dt>
						<Icon name={'talend-user-circle'} />
						{t('CREATED_BY', { defaultValue: 'Created by' })}
					</dt>
					<dd>{createdBy}</dd>
				</div>
				<div>
					<dt>
						<Icon name={usedAs.length > 1 ? 'talend-flow-source-target' : 'talend-flow-source-o'} />
						{t('USED_AS', { defaultValue: 'Used as' })}
					</dt>
					<dd>{usedAs.length === 2 ? joinedItemsMessage : usedAs[0]}</dd>
				</div>
			</dl>
		</div>
	);
}

Pipeline.propTypes = {
	name: PropTypes.string,
	createdBy: PropTypes.string,
	usedAs: PropTypes.array,
};

export function FilteredResourceList(props) {
	const { t } = useTranslation();
	const [filter, setFilter] = React.useState();
	const filteredCollection = React.useMemo(
		() =>
			(filter
				? props.collection.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
				: props.collection),
		[filter],
	);
	return (
		<ResourceList
			toolbar={{
				name: {
					label: t('FILTER', {
						defaultValue: 'Find a {{type, lowercase}}',
						type: props?.renderAs.name,
					}),
					value: filter,
					onChange: event => setFilter(event.target.value),
				},
			}}
			{...props}
			collection={filteredCollection}
		/>
	);
}

storiesOf('ResourceList', module)
	.addDecorator(story => (
		<section>
			<IconsProvider />
			{story()}
		</section>
	))
	.add('default', () => <ResourceList collection={collection} />)
	.add('simple', () => <ResourceList collection={simpleCollection} />)
	.add('preparations', () => <ResourceList collection={preparations} renderAs={Preparation} />)
	.add('filtered pipelines', () => (
		<FilteredResourceList collection={pipelines} renderAs={Pipeline} />
	));
