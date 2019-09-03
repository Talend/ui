import useLocalStorage from 'react-use/lib/useLocalStorage';
import DisplayMode from './DisplayMode';
import LazyLoadingList from './LazyLoadingList';
import Manager from './Manager';
import SortBy from './SortBy';
import TextFilter from './TextFilter';
import Toolbar from './Toolbar';
import VList from './VList';
import useCollectionSort from './Manager/hooks/useCollectionSort.hook';
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
};

export const hooks = {
	useCollectionActions,
	useCollectionSort,
	useDisplayMode: useLocalStorage,
};
