import React from 'react';
import { shallow } from 'enzyme';

import Code from './TextMode.component';

describe('Code text display mode', () => {
	const schema = {
		title: 'My input title',
	};

	it('should render textarea', () => {
		// when
		const wrapper = shallow(<Code id={'myForm'} schema={schema} value={'toto'} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with provided style options', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		const wrapper = shallow(
			<Code id={'myForm'} schema={schemaWithRows} value={'toto'} options={{ height: '20px' }} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
