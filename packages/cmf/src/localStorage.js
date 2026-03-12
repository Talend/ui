import get from 'lodash/get';
import set from 'lodash/set';

/**
 * getState read localStorage and create a initilState for redux
 * @param {string} key the localStorage key where to read
 * @return {Object} initialState for redux
 */
function getState(key) {
	let source = localStorage[key];
	if (!source) {
		return {};
	}
	source = JSON.parse(source);
	return source;
}

/**
 * getStoreCallback read localStorage and create a initialState for redux
 * @param {string} key the localStorage key where to read
 * @param {Array} paths the list of paths (Array) to serialize in localStorage
 * @return {Object} initialState for redux
 * @example

 const storeCallback = getStoreCallback('myappV1', [
	 ['cmf', 'components', 'Container(List)', 'foo'],
	 ['cmf', 'components', 'Container(SidePanel)'],
 ]);
 cmf.bootstrap({
	 ...
	 storeCallback,
 });
 */
function getStoreCallback(key, paths) {
	return store => {
		window.addEventListener('beforeunload', () => {
			const toKeep = {};
			const state = store.getState();
			paths.forEach(path => {
				if (path.length > 2) {
					if (path[1] === 'components') {
						const value = get(state.cmf.components, path.slice(2));
						if (value) {
							set(toKeep, path, value);
						}
					} else if (path[1] === 'collections') {
						const value = get(state.cmf.collections, path.slice(2));
						if (value) {
							set(toKeep, path, value);
						}
					}
				}
			});
			localStorage.setItem(key, JSON.stringify(toKeep));
		});
	};
}

export default {
	getState,
	getStoreCallback,
};
