import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { Icon, ResourceList } from '../src/index';
import IconsProvider from '../src/IconsProvider';

import { icons as resourcePickerIcons, collection, simpleCollection } from './ResourcePicker';

const icons = {
	...resourcePickerIcons,
	'talend-flow-source-o': talendIcons['talend-flow-source-o'],
	'talend-flow-source-target': talendIcons['talend-flow-source-target'],
	'talend-folder-closed': talendIcons['talend-folder-closed'],
	'talend-user-circle': talendIcons['talend-user-circle'],
};

const preparationCollection = [
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

const pipelineCollection = [
	{
		id: 0,
		name: 'Central Factors Facilitator',
		createdBy: 'Darlene Koch',
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

function Preparation({ name, createdBy, path }) {
	const { t } = useTranslation();
	return (
		<div className={'preparation'}>
			<h2>{name}</h2>
			<dl>
				<dt>
					<Icon name={'talend-user-circle'} />
					{t('CREATED_BY', { defaultValue: 'Created by' })}
				</dt>
				<dd>{createdBy}</dd>
				<dt>
					<Icon name={'talend-folder-closed'} />
					<span className={'sr-only'}>{t('Path', { defaultValue: 'Path' })}</span>
				</dt>
				<dd>{path}</dd>
			</dl>
		</div>
	);
}

Preparation.propTypes = {
	name: PropTypes.string,
	createdBy: PropTypes.string,
	path: PropTypes.string,
};

function Pipeline({ name, createdBy, usedAs }) {
	const { t } = useTranslation();
	return (
		<div className={'pipeline'}>
			<h2>{name}</h2>
			<dl>
				<dt>
					<Icon name={'talend-user-circle'} />
					{t('CREATED_BY', { defaultValue: 'Created by' })}
				</dt>
				<dd>{createdBy}</dd>
				<dt>
					<Icon name={usedAs.length > 1 ? 'talend-flow-source-o' : 'talend-flow-source-target'} />
					{t('USED_AS', { defaultValue: 'Used as' })}
				</dt>
				<dd>
					{usedAs.length === 2
						? t('JOIN_ITEMS', {
								defaultValue: '{{item1}} and {{item2}}',
								item1: usedAs[0],
								item2: usedAs[1],
						  })
						: usedAs[0]}
				</dd>
			</dl>
		</div>
	);
}

Pipeline.propTypes = {
	name: PropTypes.string,
	createdBy: PropTypes.string,
	usedAs: PropTypes.array,
};

function FilteredResourceList(props) {
	const [filter, setFilter] = React.useState();
	const filteredCollection = React.useMemo(
		() =>
			filter
				? props.collection.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
				: props.collection,
		[filter],
	);
	return (
		<ResourceList
			{...props}
			collection={filteredCollection}
			filter={{
				value: filter,
				onChange: event => setFilter(event.target.value),
			}}
		/>
	);
}

storiesOf('ResourceList', module)
	.addDecorator(story => (
		<section>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</section>
	))
	.add('default', () => <ResourceList collection={collection} />)
	.add('simple', () => <ResourceList collection={simpleCollection} />)
	.add('preparations', () => <ResourceList collection={preparationCollection} as={Preparation} />)
	.add('filtered pipelines', () => (
		<FilteredResourceList collection={pipelineCollection} as={Pipeline} />
	));
