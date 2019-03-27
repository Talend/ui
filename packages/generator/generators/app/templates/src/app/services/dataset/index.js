import {
	reducer,
	fetchDatasets,
	getDatasets,
	getIsFetching,
	removeDataset,
} from './dataset.service';

export const datasetModule = { id: 'myapp-datasets', reducer };

export default {
	actionCreators: {
		fetchDatasets,
		removeDataset,
	},
	selectors: {
		getDatasets,
		getIsFetching,
	},
};
