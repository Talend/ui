import FilterBar from './FilterBar.connect';
import { saveFilterBarToStore, updateCollectionFilterToStore } from './FilterBar.actions';
import {
	selectorFilterBar,
	getCollectionFiltered,
	getFilterInputValue,
	isFilteredCollectionNotEmpty,
	isFilterInputValueNotEmpty,
} from './FilterBar.selectors';

FilterBar.actions = {
	'filter:save': saveFilterBarToStore,
	'filter:update': updateCollectionFilterToStore,
};

FilterBar.selectors = {
	selectorFilterBar,
	getCollectionFiltered,
	getFilterInputValue,
	isFilteredCollectionNotEmpty,
	isFilterInputValueNotEmpty,
};

export default FilterBar;
