import React from 'react';
import { shallow } from 'enzyme';
import FormSwitcher from './FormSwitcher';

describe('FormSwitcher', () => {
	it('should render skeleton if props.loading', () => {
		const wrapper = shallow(<FormSwitcher loading />);
		expect(wrapper.find('FormSkeleton').length).toBe(1);
	});
});
