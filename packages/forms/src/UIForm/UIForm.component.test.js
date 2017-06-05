import React from 'react';
import { shallow } from 'enzyme';

import UIForm from './UIForm.component';

describe('UIForm component', () => {
	const props = {
		autocomplete: 'off',
		customValidation: jest.fn(),
		formName: 'myForm',
		onChange: jest.fn(),
		onTrigger: jest.fn(),
		onSubmit: jest.fn(),
	};

	const data = {
		jsonSchema: {
			type: 'object',
			title: 'Comment',
			properties: {
				lastname: {
					type: 'string',
				},
				firstname: {
					type: 'string',
				},
			},
			required: [
				'firstname',
			],
		},
		uiSchema: [
			{
				key: 'lastname',
				title: 'Last Name (with description)',
				description: 'Hint: this is the last name',
				autoFocus: true,
			},
			{
				key: 'firstname',
				title: 'First Name (with placeholder)',
				placeholder: 'Enter your firstname here',
			},
		],
		properties: {},
	};

	it('should render form', () => {
		// when
		const wrapper = shallow(<UIForm {...data} {...props} />);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should validate change', () => {
			// given
			const wrapper = shallow(<UIForm {...data} {...props} />);

			// when
			// renderer._instance._instance.onChange
		});

		it('should call onChange callback', () => {

		});

		it('should trigger "after" trigger', () => {

		});
	});

	describe('#onTrigger', () => {
		it('should do nothing if there is no trigger callback', () => {

		});

		it('should call trigger callback', () => {

		});

		it('should updateForm on trigger success', () => {

		});

		it('should setError after trigger failure', () => {

		});
	});

	describe('#submit', () => {
		it('should prevent default submit', () => {

		});

		it('should validate all fields', () => {

		});

		it('should not call submit callback when form is invalid', () => {

		});

		it('should call submit callback when form is valid', () => {

		});
	});
});
