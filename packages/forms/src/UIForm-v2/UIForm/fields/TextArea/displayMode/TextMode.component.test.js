import React from 'react';
import { shallow } from 'enzyme';

import TextArea from './TextMode.component';

describe('TextArea field text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render textarea', () => {
		// when
		const wrapper = shallow(<TextArea id={'myForm'} schema={schema} value={'toto'} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided rows', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		const wrapper = shallow(<TextArea id={'myForm'} schema={schemaWithRows} value={'toto'} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
