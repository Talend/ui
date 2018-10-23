import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './<%= props.name %>.component';
import Container, { DEFAULT_STATE } from './<%= props.name %>.container';

describe('Container <%= props.name %>', () => {
	it('should render <%= props.name %> with props', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.find(Component).length).toBe(1);
		expect(wrapper.props()).toMatchSnapshot();
	});
});
