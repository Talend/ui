import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Loader from '@talend/react-components/lib/Loader';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';
import CellTitle from '@talend/react-components/lib/VirtualizedList/CellTitle';
import DatasetService from '../../services/dataset';

function DatasetList({ datasets, fetchDatasets, isFetching, removeDataset }) {
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
		return <Loader size="large" />;
	}

	return (
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
	);
}

function mapStateToProps(state) {
	return {
		datasets: DatasetService.selectors.getDatasets(state),
		isFetching: DatasetService.selectors.getIsFetching(state),
	};
}

const mapDispatchToProps = {
	fetchDatasets: DatasetService.actionCreators.fetchDatasets,
	removeDataset: DatasetService.actionCreators.removeDataset,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DatasetList);
