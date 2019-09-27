import {
	FacetedSearchIcon as Icon,
	FacetedSearch as Faceted,
	AdvancedSearch,
	BasicSearch,
} from './components';
// import { FacetedSearchActions, facetedSearchReducer } from './service';
import * as constants from './FacetedSearch.constants';

const components = {
	Icon,
	Faceted,
	AdvancedSearch,
	BasicSearch,
};

export default { ...components, constants };
