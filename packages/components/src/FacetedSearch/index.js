import {
	FacetedSearchIcon as Icon,
	FacetedSearch as Faceted,
	AdvancedSearch,
	BasicSearch,
} from './components';
import { FacetedSearchActions, facetedSearchReducer } from './service';
import * as FacetedSearchConstants from './FacetedSearch.constants';

const FacetedSearchComponents = {
	Icon,
	Faceted,
	AdvancedSearch,
	BasicSearch,
};

const cmfModule = {
	id: 'faceted-search',
	reducer: {
		[FacetedSearchConstants.STORE_KEY]: facetedSearchReducer,
	},
};

export { FacetedSearchComponents, FacetedSearchActions, cmfModule, FacetedSearchConstants };
