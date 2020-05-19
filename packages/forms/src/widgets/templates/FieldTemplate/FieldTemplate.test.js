import React from 'react';
import { shallow, mount } from 'enzyme';
import FieldTemplate from './FieldTemplate.component';

describe('FieldTemplate', () => {
	it('should render the common widget markup', () => {
		// given
		const props = {
			descriptionId: 'test-description',
			errorId: 'test-error',
			label: 'Test',
			description: 'This is the description',
			error: 'This is the error',
		};
		// when
		const wrapper = mount(
			<FieldTemplate {...props}>
				<input name="test" />
			</FieldTemplate>,
		);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should hide description when there is an error message', () => {
		// given
		const props = {
			descriptionId: 'test-description',
			errorId: 'test-error',
			label: 'Test',
			description: 'This is the description',
			error: 'This is the error',
		};
		// when
		const wrapper = mount(
			<FieldTemplate {...props}>
				<input name="test" />
			</FieldTemplate>,
		);
		// then
		const descBlock = wrapper.find('.help-block').at(0);
		expect(descBlock.text()).toEqual('This is the description');
		expect(descBlock.getDOMNode().getAttribute('class')).toEqual('help-block sr-only');

		const errorBlock = wrapper.find('.help-block').at(1);
		expect(errorBlock.text()).toEqual('This is the error');
		expect(errorBlock.getDOMNode().getAttribute('class')).toEqual('help-block');
	});
});
