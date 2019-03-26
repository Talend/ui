const DATASET_REDUCER_KEY = 'datasets';
const DATASET_SET = 'DATASET_SET';
const DATASET_REMOVE = 'DATASET_REMOVE';

function datasetReducer(state = {}, action) {
	switch (action.type) {
		case DATASET_SET:
			return {
				...state,
				data: action.datasets,
			};
		case DATASET_REMOVE:
			return {
				...state,
				data: state.datasets.filter(ds => ds !== action.dataset),
			};
	}
}

export const reducer = {
	[DATASET_REDUCER_KEY]: datasetReducer,
};
