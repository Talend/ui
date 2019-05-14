const DATASET_REDUCER_KEY = 'datasets';
const DATASET_SET = 'DATASET_SET';
const DATASET_REMOVE = 'DATASET_REMOVE';
const DATASET_SET_FETCHING = 'DATASET_SET_FETCHING';

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
				data: state.data.filter(ds => ds !== action.dataset),
			};
		case DATASET_SET_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		default:
			return state;
	}
}

export const reducer = {
	[DATASET_REDUCER_KEY]: datasetReducer,
};

export function fetchDatasets() {
	return dispatch => {
		dispatch({ type: DATASET_SET_FETCHING, isFetching: true });
		setTimeout(() => {
			fetch('/datasets.json')
				.then(res => res.json())
				.then(datasets => {
					dispatch({
						type: DATASET_SET,
						datasets,
					});
				})
				.finally(() => {
					dispatch({ type: DATASET_SET_FETCHING, isFetching: false });
				});
		}, 3000);
	};
}

export function removeDataset(dataset) {
	return {
		type: DATASET_REMOVE,
		dataset,
	};
}

export function getDatasets(state) {
	return state[DATASET_REDUCER_KEY].data;
}

export function getIsFetching(state) {
	return state[DATASET_REDUCER_KEY].isFetching;
}
