import Connected, { mapStateToProps, ContainerActionSplitDropdown } from './ActionSplitDropdown.connect';

describe('Connected ActionSplitDropdown', () => {
	it('should connect ActionSplitDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionSplitDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionSplitDropdown);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
