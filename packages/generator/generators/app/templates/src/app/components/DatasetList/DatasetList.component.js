import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Loader from '@talend/react-components/lib/Loader';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle';<%-
	props.i18n
		? `
import { translate } from 'react-i18next';
`
		: ''
%>

import theme from './DatasetList.scss';

function DatasetList({ datasets, fetchDatasets, isFetching, removeDataset<%- props.i18n ? ', t' : '' %> }) {
	useEffect(fetchDatasets, []);
	const collection = useMemo(
		() => {
			if (!datasets) {
				return datasets;
			}
			return datasets.map(item => ({
				...item,
				actions: [
					{
						label: `Remove ${item.label}`,
						icon: 'talend-trash',
						onClick: () => removeDataset(item),
					},
				],
			}));
		},
		[datasets],
	);

	if (isFetching || !collection) {
		return <Loader className={theme.loader} size="large" />;
	}

	return (
		<React.Fragment>
			<h1><%- props.i18n ? '{ t(\'DATASETS_LIST\', { defaultValue: \'Datasets list\' }) }' : 'Datasets list' %></h1>
			<div className={theme['dataset-list']}>
				<VirtualizedList collection={collection} id="dataset-list">
					<VirtualizedList.Content label="Id" dataKey="id" width={-1} />
					<VirtualizedList.Content
						label="Label"
						dataKey="label"
						columnData={{ actionsKey: 'actions' }}
						width={-1}
						{...CellTitle}
					/>
					<VirtualizedList.Content label="Created" dataKey="created" width={-1} />
					<VirtualizedList.Content label="Tags" dataKey="tags" width={-1} />
				</VirtualizedList>
			</div>
		</React.Fragment>
	);
}
DatasetList.propTypes = {
	datasets: PropTypes.array,
	fetchDatasets: PropTypes.func.isRequired,
	isFetching: PropTypes.bool,
	removeDataset: PropTypes.func.isRequired,
};

<%-
	props.i18n ? 'export default translate()(DatasetList);' : 'export default DatasetList;'
%>
