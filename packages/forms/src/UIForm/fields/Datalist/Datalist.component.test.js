import React from 'react';
import { shallow } from 'enzyme';
import Datalist from './Datalist.component';

const schema = {
	autoFocus: true,
	description: 'This is my datalist',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	restricted: true,
	title: 'My List',
	titleMap: [
		{ name: 'foo', value: 'foo' },
		{ name: 'bar', value: 'bar' },
		{ name: 'foobar', value: 'foobar' },
		{ name: 'lol', value: 'lol' },
	],
	type: 'string',
	schema: {
		type: 'array',
	},
};

describe('Datalist component', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<Datalist
				id={'my-datalist'}
				isValid
				errorMessage={'This should be correct'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={'foo'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
