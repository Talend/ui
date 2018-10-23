import React from 'react';
import { shallow } from 'enzyme';

import <%= props.name %> from '<%= props.toConnect %>';
import Connected from './<%= props.name %>.component';

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${<%= props.name %>.displayName}))`);
		expect(Connected.WrappedComponent).toBe(<%= props.name %>);
	});
});
