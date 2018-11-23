import Immutable from 'immutable';
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
	if (source.cmf.components) {
		source.cmf.components = Immutable.fromJS(source.cmf.components);
	}
	if (source.cmf.collections) {
		source.cmf.collections = Immutable.fromJS(source.cmf.collections);
	}
	return source;
}

/**
 * getStoreCallbackToPersistStateBeforeUnload read localStorage and create a initilState for redux
 * @param {string} key the localStorage key where to read
 * @param {Array} paths the list of paths (Array) to serialize in localStorage
 * @return {Object} initialState for redux
 * @example

 const storeCallback = getStoreCallbackToPersistStateBeforeUnload('myappV1', [
	 ['cmf', 'components', 'Container(List)', 'foo'],
	 ['cmf', 'components', 'Container(SidePanel)'],
 ]);
 cmf.bootstrap({
	 ...
	 storeCallback,
 });
 */
function getStoreCall(key, paths) {
	return store => {
		window.addEventListener('beforeunload', () => {
			const toKeep = {};
			const state = store.getState();
			paths.forEach(path => {
				if (path.length > 2) {
					if (path[1] === 'components') {
						set(
							toKeep,
							path,
							state.cmf.components.getIn(path.slice(2), new Immutable.Map()).toJS(),
						);
					} else if (path[1] === 'collections') {
						set(
							toKeep,
							path,
							state.cmf.collections.getIn(path.slice(2), new Immutable.Map()).toJS(),
						);
					}
				}
			});
			localStorage.setItem(key, JSON.stringify(toKeep));
		});
	};
}

export default {
	getState,
	getStoreCall,
};
