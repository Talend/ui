import Immutable from 'immutable';
import { ACTIONS, STORE_KEY, STORE_FACETED_SEARCH_ATTR_KEY } from '../../FacetedSearch.constants';
import { facetedSearchReducer } from './FacetedSearch.reducer';
import { getFacetedSearchError, getFacetedQuery } from './FacetedSearch.selectors';
import {
	sendFacetedQuery,
	setError,
	unsetError,
	resetFacetedSearch,
} from './FacetedSearch.actions';

describe('getFacetedQuery', () => {
	it('should return a string', () => {
		// given
		const query = 'my query';
		const store = {
			[STORE_KEY]: Immutable.Map({ [STORE_FACETED_SEARCH_ATTR_KEY.QUERY]: query }),
		};
		// when
		const result = getFacetedQuery(store);
		// then
		expect(result).toEqual(query);
	});
});

describe('getFacetedSearchError', () => {
	it('should return a string', () => {
		// given
		const error = 'my error';
		const store = {
			[STORE_KEY]: Immutable.Map({ [STORE_FACETED_SEARCH_ATTR_KEY.ERROR]: error }),
		};
		// when
		const result = getFacetedSearchError(store);
		// then
		expect(result).toEqual(error);
	});
});

describe('sendFacetedQuery', () => {
	it('should return an object', () => {
		// given
		const query = 'my query';
		// when
		const action = sendFacetedQuery(query);
		// then
		expect(action).toEqual({
			type: ACTIONS.SEND_ADV_FACETED_QUERY,
			payload: {
				query,
			},
		});
	});
});

describe('setError', () => {
	it('should return an object', () => {
		// given
		const error = 'my error';
		// when
		const action = setError(error);
		// then
		expect(action).toEqual({
			type: ACTIONS.SET_ERROR,
			payload: {
				error,
			},
		});
	});
});

describe('unsetError', () => {
	it('should return an object', () => {
		// given nothing
		// when
		const action = unsetError();
		// then
		expect(action).toEqual({
			type: ACTIONS.UNSET_ERROR,
		});
	});
});

describe('resetFacetedSearch', () => {
	it('should return an object', () => {
		// given nothing
		// when
		const action = resetFacetedSearch();
		// then
		expect(action).toEqual({
			type: ACTIONS.RESET_FACETED,
		});
	});
});

describe('facetedSearchReducer', () => {
	it('should return the faceted search store with updated query', () => {
		// Given
		const query = 'my query';
		const action = sendFacetedQuery(query);
		// When
		const result = facetedSearchReducer(Immutable.Map(), action);
		// Then
		expect(result.toJS()).toEqual({ query });
	});
	it('should return the faceted search store reseted', () => {
		// Given
		const action = resetFacetedSearch();
		// When
		const result = facetedSearchReducer(Immutable.Map({ query: 'some query' }), action);
		// Then
		expect(result.toJS()).toEqual({});
	});
	it('should return the faceted search store with an updated error', () => {
		// Given
		const error = 'my faceted search error';
		const action = setError(error);
		// When
		const result = facetedSearchReducer(Immutable.Map({ query: 'some query' }), action);
		// Then
		expect(result.toJS()).toEqual({ query: 'some query', error });
	});
	it('should return the faceted search store with error reset', () => {
		// Given
		const error = 'my faceted search error';
		const action = unsetError();
		// When
		const result = facetedSearchReducer(Immutable.Map({ query: 'some query', error }), action);
		// Then
		expect(result.toJS()).toEqual({ query: 'some query' });
	});
});
