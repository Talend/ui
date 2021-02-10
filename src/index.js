import {
	FacetedSearchIcon as Icon,
	FacetedSearch as Faceted,
	AdvancedSearch,
	BasicSearch,
	badgeDefinitionTypes,
	BadgeText,
	BadgeSlider,
	BadgeOverlay,
	BadgeCheckboxes,
} from './components';
import * as constants from './constants';
import dictionaryHelpers from './dictionary/helpers.dictionary';
import * as queryClient from './queryClient';

const components = {
	Icon,
	Faceted,
	AdvancedSearch,
	BasicSearch,
	BadgeText,
	BadgeSlider,
	BadgeOverlay,
	BadgeCheckboxes,
};

const helpers = {
	dictionary: dictionaryHelpers,
};

export default { ...components, badgeDefinitionTypes, constants, helpers, queryClient };
