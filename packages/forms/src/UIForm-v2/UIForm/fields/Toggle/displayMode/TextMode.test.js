import React from 'react';
import { shallow } from 'enzyme';

import Toggle from './TextMode.component';

describe('Toggle field in text mode', () => {
	const schema = { title: 'My Toggle' };

	it('should render the Toggle', () => {
		// when
		const wrapper = shallow(<Toggle id={'myForm'} schema={schema} value />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
