import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
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
		expect(toJson(wrapper)).toMatchSnapshot();
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
		const descBlock = wrapper.find('.tc-inline-message #test-description').at(0);
		expect(descBlock.props().description).toEqual('This is the description');
		expect(descBlock.props().className).toContain('sr-only');

		const errorBlock = wrapper.find('.tc-inline-message #test-error').at(1);
		expect(errorBlock.props().description).toEqual('This is the error');
		expect(errorBlock.props().className).toBeUndefined();
	});
});
