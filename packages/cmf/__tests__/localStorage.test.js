import Immutable from 'immutable';
import localStorageAPI from '../src/localStorage';

const PATHS = [
	['cmf', 'components', 'Foo', 'default'],
	['cmf', 'components', 'NotExisting', 'default'],
	['cmf', 'collections', 'data'],
];

const state = {
	cmf: {
		app: {
			extra: true,
		},
		components: new Immutable.Map({
			Foo: new Immutable.Map({
				default: new Immutable.Map({
					foo: 'foo',
				}),
			}),
		}),
		collections: new Immutable.Map({
			data: new Immutable.Map({}),
		}),
	},
};

const serializedState = JSON.stringify(Object.assign({}, state, {
	cmf: {
		components: {
			Foo: {
				default: {
					foo: 'foo',
				},
			},
		},
		collections: {
			data: {},
		},
	},
}));
const KEY = 'test-cmf-localStorage';

describe('reduxLocalStorage', () => {
	const realEventListener = window.addEventListener;
	beforeEach(() => {
		window.addEventListener = jest.fn();
	});
	afterAll(() => {
		window.addEventListener = realEventListener;
	});
	it('should expose API', () => {
		expect(typeof localStorageAPI.getState).toBe('function');
		expect(typeof localStorageAPI.getStoreCallback).toBe('function');
	});
	it('should getState return parsed state from localStorage', () => {
		localStorage.setItem(KEY, serializedState);
		const initialState = localStorageAPI.getState(KEY);
		expect(initialState.cmf.components.getIn(['Foo', 'default', 'foo'])).toBe('foo');
		expect(initialState.cmf.collections.getIn(['data']).toJS()).toEqual({});
		localStorage.setItem(KEY, undefined);
	});
	it('should getStoreCallback return a function', () => {
		const callback = localStorageAPI.getStoreCallback(KEY, PATHS);
		expect(typeof callback).toBe('function');

		callback({ getState: () => state });
		expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', expect.anything());
		const handler = window.addEventListener.mock.calls[0][1];
		handler();
		expect(localStorage[KEY]).toBe(serializedState);
	});
});
