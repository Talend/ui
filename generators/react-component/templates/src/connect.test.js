import React from 'react';
import renderer from 'react-test-renderer';

import <%= props.name %> from '<%= props.purePath %>';
import Connected, { mapDispatchToProps, mapStateToProps } from './<%= props.name %>.component';

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(${<%= props.name %>.displayName})`);
		expect(Connected.WrappedComponent).toBe(<%= props.name %>);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		function dispatch() {
		}
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});
