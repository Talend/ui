import React from 'react';
import { shallow } from 'enzyme';

import TextMode from './TextMode.component';

describe('Text field text display mode', () => {
	const schema = {
		title: 'My input title',
		type: 'text',
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(<TextMode id={'myForm'} schema={schema} value={'toto'} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render password input', () => {
		// when
		const wrapper = shallow(
			<TextMode id={'myForm'} schema={{ ...schema, type: 'password' }} value={'toto'} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
