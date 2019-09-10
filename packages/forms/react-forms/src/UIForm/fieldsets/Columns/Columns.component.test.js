import React from 'react';
import { shallow } from 'enzyme';

import Columns from './Columns.component';

describe('Columns widget', () => {
	it('should render columns', () => {
		// given
		const columns = [
			{
				widget: 'fieldset',
				title: 'User Fieldset',
				items: [
					{
						key: ['lastname'],
						title: 'Last Name (with description)',
						description: 'Hint: this is the last name',
						schema: { type: 'string' },
						ngModelOptions: {},
						type: 'text',
					},
					{
						key: ['firstname'],
						title: 'First Name (with placeholder)',
						placeholder: 'Enter your firstname here',
						required: true,
						schema: { type: 'string' },
						ngModelOptions: {},
						type: 'text',
					},
					{
						key: ['age'],
						title: 'Age',
						schema: { type: 'number' },
						ngModelOptions: {},
						type: 'number',
					},
				],
			},
			{
				key: ['singleInput'],
				description: 'This one is a column composed by a single input',
				title: 'singleInput',
				schema: { type: 'string' },
				ngModelOptions: {},
				type: 'text',
			},
		];
		const schema = {
			widget: 'columns',
			items: columns,
			title: 'My awesome columns',
		};

		// when
		const wrapper = shallow(<Columns schema={schema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
