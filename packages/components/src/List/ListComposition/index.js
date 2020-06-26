import useLocalStorage from 'react-use/lib/useLocalStorage';
import DisplayMode from './DisplayMode';
import LazyLoadingList from './LazyLoadingList';
import Manager from './Manager';
import SortBy from './SortBy';
import TextFilter from './TextFilter';
import Toolbar from './Toolbar';
import VList from './VList';
import { sortCollection, useCollectionSort } from './Manager/hooks/useCollectionSort.hook';
import { filterCollection, useCollectionFilter } from './Manager/hooks/useCollectionFilter.hook';
import useCollectionSelection from './Manager/hooks/useCollectionSelection.hook';
import useCollectionActions from './Manager/hooks/useCollectionActions.hook';

export default {
	DisplayMode,
	LazyLoadingList,
	InfiniteScrollList: LazyLoadingList,
	Manager,
	SortBy,
	TextFilter,
	Toolbar,
	VList,

	hooks: {
		useCollectionActions,
		useCollectionSort,
		sortCollection,
		useCollectionFilter,
		useCollectionSelection,
		filterCollection,
		useDisplayMode: useLocalStorage,
	},
};
