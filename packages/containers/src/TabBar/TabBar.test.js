import Component from '@talend/react-components/lib/TabBar';

/** Plain-object shim implementing .get(key, def) for component state. */
const makeCompState = (data = {}) => ({ ...data, get: (k, def) => (k in data ? data[k] : def) });
/** Plain-object shim implementing .getIn([outer, inner], def) for state.cmf.components. */
const makeComponents = (data = {}) => ({
	getIn([outer, inner], def) {
		const outerVal = data[outer];
		if (outerVal == null) return def;
		const innerVal = outerVal[inner];
		return innerVal !== undefined ? innerVal : def;
	},
});
import Connected, { DEFAULT_STATE } from './TabBar.connect';
import { getComponentState, getSelectedKey } from './TabBar.selectors';

describe('TabBar connected', () => {
	it('should connect TabBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Component.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Component);
	});
});

describe('TabBar selectors', () => {
	let mockState;
	const componentState = makeCompState({ selectedKey: 'hello' });
	beforeEach(() => {
		mockState = {
			cmf: {
				components: makeComponents({ [Component.displayName]: { thisTabBar: componentState } }),
			},
		};
	});

	it('should return the state', () => {
		expect(getComponentState(mockState, 'thisTabBar')).toEqual(componentState);
	});
	it('should return the default state', () => {
		expect(getComponentState(mockState, 'idNotExist')).toEqual(DEFAULT_STATE);
	});
	it('should return selectedKey', () => {
		expect(getSelectedKey(mockState, 'thisTabBar')).toEqual('hello');
	});
	it('should return default value if pass wrong componentId', () => {
		expect(getSelectedKey(mockState, 'idNotExist')).toBe(undefined);
	});
});
