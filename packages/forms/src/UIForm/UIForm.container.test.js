import React from 'react';
import { shallow } from 'enzyme';

import { data, mergedSchema, initProps } from '../../__mocks__/data';
import UIForm from './UIForm.container';

describe('UIForm container', () => {
	let props;
	beforeEach(() => {
		props = initProps();
	});

	it('should render form', () => {
		// when
		const wrapper = shallow(<UIForm data={data} {...props} />);

		// then
		expect(wrapper // eslint-disable-line no-underscore-dangle
			.instance()
			.state
		).toMatchSnapshot();
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should update state properties and errors', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();

			// when
			instance.onChange(
				null,
				{
					formName: props.formName,
					schema: mergedSchema[0],
					value: 'toto',
					error: 'too short',
				},
			);

			// then
			expect(instance.state).toMatchSnapshot();
		});

		it('should trigger onChange callback', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
			const event = { target: {} };

			// when
			instance.onChange(
				event,
				{
					formName: props.formName,
					schema: mergedSchema[0],
					value: 'toto',
					error: 'too short',
				},
			);

			// then
			expect(props.onChange).toBeCalledWith(
				event,
				{
					formName: props.formName,
					schema: mergedSchema[0],
					value: 'toto',
					error: 'too short',
					properties: props.properties,
				}
			);
		});
	});

	describe('#setErrors', () => {
		it('should update state errors', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
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
			const instance = wrapper.instance();
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
			const instance = wrapper.instance();
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
