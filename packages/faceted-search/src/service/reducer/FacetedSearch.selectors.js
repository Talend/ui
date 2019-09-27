import Immutable from 'immutable';
import { STORE_KEY, STORE_FACETED_SEARCH_ATTR_KEY } from '../../FacetedSearch.constants';

const getFacetedSearch = store => store[STORE_KEY] || Immutable.Map();

const getFacetedSearchError = store =>
	getFacetedSearch(store).get(STORE_FACETED_SEARCH_ATTR_KEY.ERROR);

const getFacetedQuery = store =>
	getFacetedSearch(store).get(STORE_FACETED_SEARCH_ATTR_KEY.QUERY, '');

export { getFacetedSearchError, getFacetedQuery };
