import {
	reducer,
	fetchDatasets,
	getDatasets,
	getIsFetching,
	removeDatasets,
} from './dataset.service';

export const datasetModule = { id: 'myapp-datasets', reducer };

export default {
	actionCreators: {
		fetchDatasets,
		removeDatasets,
	},
	selectors: {
		getDatasets,
		getIsFetching,
	},
};
