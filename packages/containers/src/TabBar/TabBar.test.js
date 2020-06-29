import { Map } from 'immutable';
import TabBar from '@talend/react-components/lib/TabBar';
import Connected, { DEFAULT_STATE } from './TabBar.connect';
import { getComponentState, getSelectedKey } from './TabBar.selectors';

describe('TabBar connected', () => {
	it('should connect TabBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${TabBar.displayName}))`);
		expect(Connected.WrappedComponent).toBe(TabBar);
	});
});

describe('TabBar selectors', () => {
	let mockState;
	const componentState = Map({ selectedKey: 'hello' });
	beforeEach(() => {
		mockState = {
			cmf: { components: Map({ [TabBar.displayName]: Map({ thisTabBar: componentState }) }) },
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
