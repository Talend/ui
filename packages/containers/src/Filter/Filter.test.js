import React from 'react';
import { shallow } from 'enzyme';
import Container from './Filter.container';

describe('Filter', () => {
	it('should', () => {
		const setState = jest.fn();
		const wrapper = shallow(<Container setState={setState} />);
		const event = {};
		const query = 'foo';
		wrapper.simulate('filter', event, query);
		expect(setState).toHaveBeenCalledWith({ query });
	});
});
