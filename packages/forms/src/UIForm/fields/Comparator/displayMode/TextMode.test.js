import React from 'react';
import { shallow } from 'enzyme';

import TextMode from './TextMode.component';

describe('Text field text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render a comparator field in text mode', () => {
		const value = {
			operator: '>=',
			value: '666',
		};
		const wrapper = shallow(<TextMode id={'myForm'} schema={schema} value={value} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
