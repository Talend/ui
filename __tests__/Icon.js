import React from 'react';
import Icon from '../src/Icon';
import { shallow } from 'enzyme';

describe('Icon', () => {
	it('should display create i tag with classNames', () => {
		const wrapper = shallow(
			<Icon name="icon-datastore" />
		);
		expect(wrapper.containsMatchingElement(<i className="fa icon-datastore"></i>)).toEqual(true);
	});
});
