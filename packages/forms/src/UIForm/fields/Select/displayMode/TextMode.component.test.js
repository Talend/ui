import React from 'react';
import { shallow } from 'enzyme';

import TextMode from './TextMode.component';

describe('Text field text display mode', () => {
	const schema = {
		title: 'My input title',
		type: 'select',
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(<TextMode id={'myForm'} schema={schema} value="toto" />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render array input', () => {
		// when
		const wrapper = shallow(<TextMode id={'myForm'} schema={schema} value={['toto']} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
