import React from 'react';
import { shallow } from 'enzyme';

import RadioOrSelect from './RadioOrSelect.component';

describe('RadioOrSelect field', () => {
	const schema = {
		description: 'Select me',
		placeholder: 'Please select a value',
		schema: {
			enum: ['foo', 'bar', 'lol'],
			type: 'string',
		},
		title: 'My Select title',
		titleMap: [{ name: 'My foo title', value: 'foo' }, { name: 'My bar title', value: 'bar' }],
	};

	it('should render select when titleMap has less than 2 options', () => {
		// when
		const wrapper = shallow(
			<RadioOrSelect
				id={'myRadioOrSelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={'foo'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render select when titleMap has more than 2 options', () => {
		// given
		const moreThan2OptionsSchema = {
			...schema,
			titleMap: [...schema.titleMap, { name: 'My lol title', value: 'lol' }],
		};

		// when
		const wrapper = shallow(
			<RadioOrSelect
				id={'myRadioOrSelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={moreThan2OptionsSchema}
				value={'lol'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
