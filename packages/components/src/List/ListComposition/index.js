import useLocalStorage from 'react-use/lib/useLocalStorage';
import DisplayMode from './DisplayMode';
import ColumnChooser from './ColumnChooser';
import ItemsNumber from './ItemsNumber';
import LazyLoadingList from './LazyLoadingList';
import Manager from './Manager';
import SortBy from './SortBy';
import TextFilter from './TextFilter';
import Toolbar from './Toolbar';
import VList from './VList';
import SelectAll from '../Toolbar/SelectAll';
import { sortCollection, useCollectionSort } from './Manager/hooks/useCollectionSort.hook';
import { filterCollection, useCollectionFilter } from './Manager/hooks/useCollectionFilter.hook';
import useCollectionSelection from './Manager/hooks/useCollectionSelection.hook';
import useCollectionActions from './Manager/hooks/useCollectionActions.hook';
import * as constants from './constants';

export default {
	constants,
	ColumnChooser,
	DisplayMode,
	ItemsNumber,
	LazyLoadingList,
	InfiniteScrollList: LazyLoadingList,
	Manager,
	SelectAll,
	SortBy,
	TextFilter,
	Toolbar,
	VList,
};

export const hooks = {
	useCollectionActions,
	useCollectionSort,
	sortCollection,
	useCollectionFilter,
	useCollectionSelection,
	filterCollection,
	useDisplayMode: useLocalStorage,
};
