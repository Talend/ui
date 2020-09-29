import {
	FacetedSearchIcon as Icon,
	FacetedSearch as Faceted,
	AdvancedSearch,
	BasicSearch,
} from './components';
import * as constants from './constants';
import dictionaryHelpers from './dictionary/helpers.dictionary';

const components = {
	Icon,
	Faceted,
	AdvancedSearch,
	BasicSearch,
};

const helpers = {
	dictionary: dictionaryHelpers,
};

export default { ...components, constants, helpers };
