import React from 'react';
import renderer from 'react-test-renderer';

import <%= props.name %> from './<%= props.name %>.component';

describe('<%= props.name %>', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<<%= props.name %> name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
