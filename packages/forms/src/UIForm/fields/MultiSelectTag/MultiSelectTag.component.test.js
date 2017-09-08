import React from 'react';
import { shallow } from 'enzyme';
import MultiSelectTag from './MultiSelectTag.component';

describe('MultiSelectTag field', () => {
	const props = {
		id: 'my-select-tag',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema: {
			autoFocus: true,
			description: 'This is the MultiSelectTag field',
			disabled: false,
			placeholder: 'Type here',
			readOnly: false,
			restricted: false,
			title: 'Tags',
			titleMap: [{ name: 'toto', value: 'titi' }, { name: 'tata', value: 'tutu' }],
		},
		value: ['aze', 'tutu'],
	};

	it('should render MultiSelectTag', () => {
		// when
		const wrapper = shallow(<MultiSelectTag {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
