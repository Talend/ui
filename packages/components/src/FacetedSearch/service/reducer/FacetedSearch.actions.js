import { ACTIONS } from '../../FacetedSearch.constants';

const setError = error => ({
	type: ACTIONS.SET_ERROR,
	payload: {
		error,
	},
});

const unsetError = () => ({
	type: ACTIONS.UNSET_ERROR,
});

const sendFacetedQuery = query => ({
	type: ACTIONS.SEND_ADV_FACETED_QUERY,
	payload: {
		query,
	},
});

const resetFacetedSearch = () => ({
	type: ACTIONS.RESET_FACETED,
});

export { sendFacetedQuery, setError, unsetError, resetFacetedSearch };
