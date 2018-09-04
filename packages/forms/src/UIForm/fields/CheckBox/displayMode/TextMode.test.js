import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from './TextMode.component';

describe('CheckBox field in text mode', () => {
	const schema = { title: 'My checkbox title' };

	it('should render checked value', () => {
		// when
		const wrapper = shallow(<CheckBox id={'myForm'} schema={schema} value />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render unchecked value', () => {
		// when
		const wrapper = shallow(<CheckBox id={'myForm'} schema={schema} value={false} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
