import Immutable from 'immutable';
import { STORE_FACETED_SEARCH_ATTR_KEY, ACTIONS } from '../../FacetedSearch.constants';

const initialState = Immutable.Map({});

const facetedSearchReducer = (store = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.SEND_ADV_FACETED_QUERY:
			return store.set(
				STORE_FACETED_SEARCH_ATTR_KEY.QUERY,
				payload[STORE_FACETED_SEARCH_ATTR_KEY.QUERY],
			);
		case ACTIONS.RESET_FACETED:
			return initialState;
		case ACTIONS.SET_ERROR:
			return store.set(
				STORE_FACETED_SEARCH_ATTR_KEY.ERROR,
				payload[STORE_FACETED_SEARCH_ATTR_KEY.ERROR],
			);
		case ACTIONS.UNSET_ERROR:
			return store.delete(STORE_FACETED_SEARCH_ATTR_KEY.ERROR);
		default:
			return store;
	}
};

export { facetedSearchReducer };
