import * as constants from './constants';
import {
	AdvancedSearch,
	BadgeCheckboxes,
	BadgeCheckboxesForm,
	badgeDefinitionTypes,
	BadgeFaceted,
	BadgeOverlay,
	BadgeSlider,
	BadgeText,
	BasicSearch,
	FacetedSearch as Faceted,
} from './components';
import dictionaryHelpers from './dictionary/helpers.dictionary';
import { operatorNames } from './dictionary/operator.dictionary';

const components = {
	Faceted,
	AdvancedSearch,
	BasicSearch,
	BadgeText,
	BadgeSlider,
	BadgeOverlay,
	BadgeCheckboxes,
	BadgeCheckboxesForm,
	BadgeFaceted,
};

const helpers = {
	dictionary: dictionaryHelpers,
	operatorNames,
};

export default { ...components, badgeDefinitionTypes, constants, helpers };
