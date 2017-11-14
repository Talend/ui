import Filter from './Filter.connect';
import { saveFilterToStore, updateCollectionFilterToStore } from './Filter.actions';
import {
	selectorFilter,
	getCollectionFiltered,
	getFilterInputValue,
	isFilteredCollectionNotEmpty,
	isFilterInputValueNotEmpty,
} from './Filter.selectors';

Filter.actions = {
	'filter:save': saveFilterToStore,
	'filter:update': updateCollectionFilterToStore,
};

Filter.selectors = {
	selectorFilter,
	getCollectionFiltered,
	getFilterInputValue,
	isFilteredCollectionNotEmpty,
	isFilterInputValueNotEmpty,
};

export default Filter;
