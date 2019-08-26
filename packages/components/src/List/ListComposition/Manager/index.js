import ListManager from './ListManager.component';
import useCollectionSort from './hooks/sort.hook';
import useLocalStorage from './hooks/useLocalStorage.hook';

export default ListManager;

export const hooks = {
	useCollectionSort,
	useDisplayMode: useLocalStorage,
};
