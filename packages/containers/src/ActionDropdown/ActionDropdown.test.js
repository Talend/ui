import Connected, { mapStateToProps, ContainerActionDropdown } from './ActionDropdown.connect';

describe('Connected ActionDropdown', () => {
	it('should connect ActionDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionDropdown);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
