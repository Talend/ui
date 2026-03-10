import { mock } from '@talend/react-cmf';

import Container from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

/** Plain-object shim implementing .get(key, def) for a nested Immutable-Map-like componentState. */
const makeCompState = (data = {}) => ({ ...data, get: (k, def) => (k in data ? data[k] : def) });
/** Plain-object shim implementing .getIn(keys, def) for state.cmf.collections. */
const makeCollections = (data = {}) => ({
	getIn(keys, def) {
		let curr = data;
		for (const key of keys) {
			if (curr == null || typeof curr !== 'object') return def;
			curr = curr[key];
		}
		return curr !== undefined ? curr : def;
	},
});
/** Plain-object shim implementing .getIn([outer, inner], def) for state.cmf.components. */
const makeComponents = (data = {}) => ({
	getIn([outer, inner], def) {
		const outerVal = data[outer];
		if (outerVal == null) return def;
		const innerVal = outerVal[inner];
		return innerVal !== undefined ? innerVal : def;
	},
});

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const data = [{ label: 'foo' }, { label: 'bar' }];
		state.cmf.collections = makeCollections({ width: { data } });
		state.cmf.components = makeComponents({
			'Container(FilterBar)': { test: makeCompState({ query: 'foo' }) },
			'Container(Tree)': { test: makeCompState({ selectedId: '27' }) },
		});
		const props = mapStateToProps(state, {
			id: 'test',
			nameAttr: 'label',
			source: 'width.data',
			tree: { extra: true },
		});
		expect(typeof props).toBe('object');
		expect(props).toEqual({
			query: 'foo',
			sourceData: data,
			tree: {
				extra: true,
				nameAttr: 'label',
			},
		});
	});
});
