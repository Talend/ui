import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../src/Icon';

describe('Icon', () => {
	it('should display create i tag with classNames', () => {
		const wrapper = shallow(
			<Icon name="icon-datastore" />
		);
		expect(wrapper.containsMatchingElement(<i className="fa icon-datastore" />)).toEqual(true);
	});
});
