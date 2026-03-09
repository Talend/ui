/**
 * @jest-environment jest-environment-jsdom-global
 */
import { Map, List } from 'immutable';
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
		components: new Map({
			Foo: new Map({
				default: new Map({
					foo: 'foo',
				}),
			}),
		}),
		collections: new Map({
			data: new Map({}),
		}),
	},
};

const serializedState = JSON.stringify(
	Object.assign({}, state, {
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
	}),
);
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
	it('should getState restore arrays as immutable Lists', () => {
		const stateWithList = JSON.stringify({
			cmf: {
				components: {
					Foo: {
						default: {
							items: ['a', 'b', 'c'],
						},
					},
				},
				collections: {},
			},
		});
		localStorage.setItem(KEY, stateWithList);
		const initialState = localStorageAPI.getState(KEY);
		const items = initialState.cmf.components.getIn(['Foo', 'default', 'items']);
		expect(List.isList(items)).toBe(true);
		expect(items.toJS()).toEqual(['a', 'b', 'c']);
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
