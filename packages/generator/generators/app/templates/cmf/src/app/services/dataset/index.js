import {
	reducer,
	fetchDatasets,
	getDatasets,
	getIsFetching,
	removeDataset,
} from './dataset.service';

export const datasetModule = {
	id: 'myapp-datasets',
	reducer,
	actionCreators: {
		fetchDatasets,
		removeDataset,
	},
};

export default {
	selectors: {
		getDatasets,
		getIsFetching,
	},
};
