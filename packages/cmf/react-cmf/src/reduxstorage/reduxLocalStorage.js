import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import immutablejs from './redux-storage-decorator-immutablejs';

const CMF_IMMUTABLE_PATHS = [['cmf', 'components'], ['cmf', 'collections']];

const CMF_MIDDLEWARE_BLACK_LIST = ['@@INIT', '@@router/LOCATION_CHANGE'];

function loadInitialState(options = {}) {
	if (process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		console.warn('DEPRECATED: this API will be removed in the next major release');
	}
	const {
		key,
		immutables = [],
		whitelist = [],
		blacklist = [],
		middlewareWhitelist = [],
		middlewareBlacklist = [],
	} = options;
	let engine = createEngine(key);
	engine = filter(engine, whitelist, blacklist);

	const ipaths = [];
	CMF_IMMUTABLE_PATHS.forEach(p => ipaths.push(p));
	immutables.forEach(p => ipaths.push(p));
	engine = immutablejs(engine, ipaths);

	const mblack = [];
	CMF_MIDDLEWARE_BLACK_LIST.forEach(m => mblack.push(m));
	middlewareBlacklist.forEach(m => mblack.push(m));
	const storageMiddleware = storage.createMiddleware(engine, mblack, middlewareWhitelist);

	return storage
		.createLoader(engine)({
			dispatch: () => {},
		})
		.then(initialState => ({
			initialState,
			storageMiddleware,
			engine,
		}));
}

function saveOnReload({ engine, store }) {
	if (process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line no-console
		console.warn('DEPRECATED: this API will be removed in the next major release');
	}
	window.addEventListener('beforeunload', () => {
		engine.save(store.getState()); // localstorage is sync
	});
}

export default {
	loadInitialState,
	saveOnReload,
};
