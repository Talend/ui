import DisplayMode from './DisplayMode';
import LazyLoadingList from './LazyLoadingList';
import Manager from './Manager';
import SortBy from './SortBy';
import TextFilter from './TextFilter';
import Toolbar from './Toolbar';
import VList from './VList';
import useCollectionSort from './Manager/hooks/sort.hook';
import useLocalStorage from './Manager/hooks/useLocalStorage.hook';

export default {
	DisplayMode,
	LazyLoadingList,
	InfiniteScrollList: LazyLoadingList,
	Manager,
	SortBy,
	TextFilter,
	Toolbar,
	VList,
};

export const hooks = {
	useCollectionSort,
	useDisplayMode: useLocalStorage,
};
