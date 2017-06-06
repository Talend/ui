import React from 'react';
import { shallow } from 'enzyme';

import UIForm from './UIForm.container';

const data = {
	jsonSchema: {
		type: 'object',
		title: 'Comment',
		properties: {
			lastname: {
				type: 'string',
				minLength: 10,
			},
			firstname: {
				type: 'string',
			},
			check: {},
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
			triggers: ['after'],
		},
		{
			key: 'check',
			type: 'button',
			title: 'Check the thing',
			triggers: ['after'],
		},
	],
	properties: {},
	errors: {},
};

const mergedSchema = [
	{
		autoFocus: true,
		description: 'Hint: this is the last name',
		key: ['lastname'],
		minlength: 10,
		ngModelOptions: {},
		schema: { minLength: 10, type: 'string' },
		title: 'Last Name (with description)',
		type: 'text',
	},
	{
		key: ['firstname'],
		ngModelOptions: {},
		placeholder: 'Enter your firstname here',
		required: true,
		schema: { type: 'string' },
		title: 'First Name (with placeholder)',
		triggers: ['after'],
		type: 'text',
	},
	{
		key: ['check'],
		title: 'Check the thing',
		triggers: ['after'],
		type: 'button',
	},
];

let props;
function initProps() {
	props = {
		autoComplete: 'off',
		customValidation: jest.fn(),
		formName: 'myFormName',
		id: 'myFormId',
		onChange: jest.fn(),
		onSubmit: jest.fn(),
		onTrigger: jest.fn(),
		widgets: {
			custom: () => (<div>Custom</div>),
		},
	};
}

describe('UIForm container', () => {
	beforeEach(() => initProps());

	it('should render form', () => {
		// when
		const wrapper = shallow(<UIForm data={data} {...props} />);

		// then
		expect(wrapper // eslint-disable-line no-underscore-dangle
			.renderer
			._instance
			._instance
			.state
		).toMatchSnapshot();
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should update state properties and errors', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper // eslint-disable-line no-underscore-dangle
				.renderer
				._instance
				._instance;

			// when
			instance.onChange(
				props.formName,
				mergedSchema[0],
				'toto',
				'too short',
			);

			// then
			expect(instance.state).toMatchSnapshot();
		});

		it('should trigger onChange callback', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper // eslint-disable-line no-underscore-dangle
				.renderer
				._instance
				._instance;

			// when
			instance.onChange(
				props.formName,
				mergedSchema[0],
				'toto',
				'too short',
			);

			// then
			expect(props.onChange).toBeCalledWith(mergedSchema[0], 'toto', { lastname: 'toto' });
		});
	});

	describe('#setErrors', () => {
		it('should update state errors', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper // eslint-disable-line no-underscore-dangle
				.renderer
				._instance
				._instance;
			const errors = { firstname: 'my firstname is invalid' };

			// when
			instance.setErrors(props.formName, errors);

			// then
			expect(instance.state).toMatchSnapshot();
		});
	});

	describe('#setError', () => {
		it('should update state error', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper // eslint-disable-line no-underscore-dangle
				.renderer
				._instance
				._instance;
			const errors = { firstname: 'my firstname is invalid' };

			// when
			instance.setError(props.formName, errors);

			// then
			expect(instance.state).toMatchSnapshot();
		});
	});

	describe('#updateForm', () => {
		it('should update state form', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper // eslint-disable-line no-underscore-dangle
				.renderer
				._instance
				._instance;
			const jsonSchema = {
				type: 'object',
				title: 'title',
				properties: {
					lastname: {
						type: 'string',
					},
				},
			};
			const uiSchema = ['lastname'];
			const properties = { lastname: 'lol' };
			const errors = { lastname: 'my lastname is invalid' };

			// when
			instance.updateForm(props.formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(instance.state).toMatchSnapshot();
		});
	});
});
