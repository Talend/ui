import { createContext, useContext } from 'react';
import invariant from 'invariant';

const facetedSearchContext = createContext();

const useFacetedSearchContext = () => {
	const context = useContext(facetedSearchContext);
	invariant(
		context,
		'[facetedSearchContext]: You are using one of faceted mode outside the faceted search',
	);
	return context;
};

const FacetedSearchProvider = facetedSearchContext.Provider;

export { FacetedSearchProvider, useFacetedSearchContext };
