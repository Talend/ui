import { ActionSplitDropdown } from '@talend/react-components';
import Connected, { mapStateToProps } from './ActionSplitDropdown.connect';

describe('Connected ActionSplitDropdown', () => {
	it('should connect ActionSplitDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ActionSplitDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ActionSplitDropdown);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
