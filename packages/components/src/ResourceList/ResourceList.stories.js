import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ResourceList from './ResourceList.component';
import IconsProvider from '../IconsProvider';
import Icon from '../Icon';

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'First Author',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		author: 'Second Author',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		flags: ['FAVORITE'],
	},
	{
		id: 3,
		name: 'Title with icon',
		modified: '2016-09-22',
		author: 'Third Author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED'],
	},
	{
		id: 4,
		name: 'Title in input mode',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super super super long text',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 5,
		name: 'Without author',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
];

const simpleCollection = [
	{
		icon: 'talend-file-xls-o',
		id: 0,
		name: 'Title with few actions',
		subtitle:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor felis ultricies felis molestie placerat quis sit amet felis.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 1,
		name: 'Title with lot of actions',
		subtitle:
			'Duis eros erat, ultricies sit amet tincidunt at, placerat quis ipsum. Cras nisi felis, condimentum sodales odio aliquet, accumsan molestie velit.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 2,
		name: 'Title with persistant actions',
		subtitle:
			'Duis eros erat, ultricies sit amet tincidunt at, placerat quis ipsum. Cras nisi felis, condimentum sodales odio aliquet, accumsan molestie velit.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 3,
		name: 'Title with icon',
		subtitle:
			'Curabitur ac nulla ut augue vulputate aliquet vitae at est. Curabitur massa lacus, sagittis eu cursus vel, consectetur ultricies nibh.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 4,
		name: 'Title in input mode',
		subtitle:
			'Curabitur ac porttitor nunc. Quisque molestie sollicitudin nisi sed tincidunt. Nam facilisis enim nec urna pretium, vel porttitor nisl venenatis.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 5,
		subtitle:
			'Cras enim ligula, ornare at lorem sed, hendrerit tempor magna. Integer ac sapien sapien. Nam scelerisque tellus at ligula pharetra vulputate.',
	},
	{
		icon: 'talend-file-xls-o',
		id: 6,
		name: 'Without author',
		subtitle: 'Vestibulum felis nulla, commodo sed sem ac, maximus sollicitudin libero.',
	},
];

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
		createdBy:
			'Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch Darlene Koch',
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

const commonProps = {
	onRowClick: action('onRowClick'),
};

export function Preparation({ name, createdBy, path }) {
	const { t } = useTranslation();
	return (
		<div className="preparation">
			<h3>{name}</h3>
			<dl>
				<div>
					<dt>
						<Icon name="talend-user-circle" />
						{t('CREATED_BY', { defaultValue: 'Created by' })}
					</dt>
					<dd>{createdBy}</dd>
				</div>
				<div>
					<dt className="icon-only">
						<Icon name="talend-folder-closed" />
						<span className="sr-only">{t('Path', { defaultValue: 'Path' })}</span>
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
		<div className="pipeline">
			<h3>{name}</h3>
			<dl>
				<div>
					<dt>
						<Icon name="talend-user-circle" />
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
			filter
				? props.collection.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
				: props.collection,
		[filter],
	);
	return (
		<ResourceList
			{...commonProps}
			toolbar={{
				name: {
					label: t('FILTER', {
						defaultValue: 'Find a {{type, lowercase}}',
						type: props?.renderAs?.name,
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

storiesOf('Data/List/ResourceList', module)
	.add('default', () => <ResourceList {...commonProps} collection={collection} />)
	.add('simple', () => <ResourceList {...commonProps} collection={simpleCollection} />)
	.add('preparations', () => (
		<ResourceList {...commonProps} collection={preparations} renderAs={Preparation} />
	))
	.add('with rowProps', () => (
		<ResourceList
			{...commonProps}
			collection={preparations}
			renderAs={Preparation}
			rowProps={{ style: { color: 'red' }, 'data-feature': 'my.data.feature' }}
		/>
	))
	.add('filtered pipelines', () => (
		<FilteredResourceList collection={pipelines} renderAs={Pipeline} />
	));
