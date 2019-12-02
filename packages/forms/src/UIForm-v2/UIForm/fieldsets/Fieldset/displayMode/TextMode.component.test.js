import React from 'react';
import { shallow } from 'enzyme';

import FieldsetTextMode from './TextMode.component';

describe('Fieldset widget in text mode', () => {
	it('should render a title described by a definition list', () => {
		// given
		const schema = {
			title: 'My fieldset',
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
				},
				{
					key: ['user', 'lastname'],
					type: 'text',
					schema: { type: 'string' },
				},
			],
		};

		// when
		const wrapper = shallow(<FieldsetTextMode schema={schema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a simple definition list without title', () => {
		// given
		const schema = {
			items: [
				{
					key: ['user', 'firstname'],
					type: 'text',
					schema: { type: 'string' },
				},
				{
					key: ['user', 'lastname'],
					type: 'text',
					schema: { type: 'string' },
				},
			],
		};

		// when
		const wrapper = shallow(<FieldsetTextMode schema={schema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
