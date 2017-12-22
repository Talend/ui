import React from 'react';
import { shallow } from 'enzyme';

import { <%= props.name %> } from '<%= props.purePath %>';
import Connected, { mapStateToProps } from './<%= props.name %>.component';

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${<%= props.name %>.displayName}))`);
		expect(Connected.WrappedComponent).toBe(<%= props.name %>);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
