import { ActionDropdown } from '@talend/react-components';
import Connected, { mapStateToProps } from './ActionDropdown.connect';

describe('Connected ActionDropdown', () => {
	it('should connect ActionDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ActionDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ActionDropdown);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
