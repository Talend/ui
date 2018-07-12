import React from 'react';
import { shallow, mount } from 'enzyme';
import tv4 from 'tv4';
import { actions, data, mergedSchema, initProps } from '../../__mocks__/data';

import UIForm, { UIFormComponent } from './UIForm.component';

describe('UIForm component', () => {
	let props;
	beforeEach(() => {
		props = {
			...initProps(),
			setError: jest.fn(),
			setErrors: jest.fn(),
			updateForm: jest.fn(),
		};
	});

	it('should render form', () => {
		// when
		const wrapper = shallow(<UIFormComponent {...data} {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided actions', () => {
		// when
		const wrapper = shallow(<UIFormComponent {...data} {...props} actions={actions} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should take in account customFormat', () => {
		// given
		const notABCRegExp = /[^abc]+/g;
		const customFormats = {
			noABC: fieldData => {
				if (typeof fieldData === 'string' && !notABCRegExp.test(fieldData)) {
					return 'test custom';
				}
				return null;
			},
		};

		expect(tv4.validate('abc', { format: 'noABC' })).toBe(true);
		expect(tv4.validate('def', { format: 'noABC' })).toBe(true);

		mount(<UIForm {...data} {...props} customFormats={customFormats} />);

		expect(tv4.validate('abc', { format: 'noABC' })).toBe(false);
		expect(tv4.validate('def', { format: 'noABC' })).toBe(true);
	});

	describe('#onChange', () => {
		it('should call onChange callback', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} />);
			const newValue = 'toto';
			const event = { target: { value: newValue } };

			// when
			wrapper
				.find('input')
				.at(0)
				.simulate('change', event);

			// then
			expect(props.onChange).toBeCalledWith(expect.anything(), {
				schema: mergedSchema[0],
				value: newValue,
				oldProperties: data.properties,
				properties: { lastname: 'toto' },
				formData: { lastname: 'toto' },
			});
			expect(props.onTrigger).not.toBeCalled();
			expect(props.setErrors).not.toBeCalled();
		});

		it('should not perform trigger onChange', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} properties={{ firstname: 'to' }} />);
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper
				.find('input')
				.at(1)
				.simulate('change', { target: { value: 'toto' } });

			// then
			expect(props.onTrigger).not.toBeCalled();
		});
	});

	describe('#onFinish', () => {
		it('should perform trigger', () => {
			// given
			const validData = {
				...data,
				properties: { firstname: 'toto' },
			};
			const wrapper = mount(<UIForm {...validData} {...props} />);
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper
				.find('input')
				.at(1)
				.simulate('blur');

			// then
			expect(props.onTrigger).toBeCalledWith(expect.anything(), {
				trigger: 'after',
				schema: {
					key: ['firstname'],
					title: 'First Name (with placeholder)',
					placeholder: 'Enter your firstname here',
					triggers: ['after'],
					required: true,
					schema: { type: 'string' },
					ngModelOptions: {},
					type: 'text',
				},
				properties: validData.properties,
				errors: validData.errors,
			});
		});

		it('should NOT perform trigger when field has errors', () => {
			// given: required firstname is empty
			const wrapper = mount(<UIForm {...data} {...props} />);
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper
				.find('input')
				.at(1)
				.simulate('blur');

			// then
			expect(props.onTrigger).not.toBeCalled();
		});

		it('should set errors, applying widget errors hook', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);
			const newValue = 'toto is toto';
			const event = { target: { value: newValue } };
			const newErrors = { lastname: 'lol' };
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper.instance().onFinish(
				event,
				{ schema: mergedSchema[0], value: newValue },
				{
					widgetChangeErrors() {
						return newErrors;
					},
				},
			);

			// then
			expect(props.setErrors).toBeCalledWith(event, newErrors);
		});
	});

	describe('#onTrigger', () => {
		it('should call trigger callback', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} />);

			// when
			wrapper
				.find('button')
				.at(0)
				.simulate('click');

			// then
			expect(props.onTrigger).toBeCalledWith(expect.anything(), {
				properties: {},
				errors: {},
				trigger: 'after',
				schema: mergedSchema[2],
			});
		});
		it('should throw error if call without trigger', () => {
			// given
			const wrapper = shallow(<UIForm {...data} {...props} />);

			// when
			const toThrow = () => wrapper.instance.onTrigger({}, {});

			// then
			expect(toThrow).toThrow();
		});
		it('should ensure properties, error and schema are passed from props', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);

			// when
			const trigger = { foo: 'trigger' };
			const event = { type: 'change' };
			wrapper.instance().onTrigger(event, { trigger });

			// then
			expect(props.onTrigger).toHaveBeenCalled();
			expect(props.onTrigger.mock.calls[0][0]).toBe(event);
			expect(props.onTrigger.mock.calls[0][1].properties).toBe(data.properties);
			expect(props.onTrigger.mock.calls[0][1].errors).toBe(data.errors);
			expect(props.onTrigger.mock.calls[0][1].schema).toBe(props.schema);
		});
		it('should let args override default props', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);

			// when
			const trigger = { foo: 'trigger' };
			const event = { type: 'change' };
			const properties = { foo: 'I am a properties' };
			const errors = { foo: 'I am a errors' };
			const schema = { foo: 'I am a schema' };
			const value = "I'm a value";
			wrapper.instance().onTrigger(event, { trigger, properties, errors, schema, value });

			// then
			expect(props.onTrigger).toHaveBeenCalled();
			expect(props.onTrigger.mock.calls[0][0]).toBe(event);
			expect(props.onTrigger.mock.calls[0][1].properties).not.toBe(data.properties);
			expect(props.onTrigger.mock.calls[0][1].errors).not.toBe(data.errors);
			expect(props.onTrigger.mock.calls[0][1].schema).not.toBe(props.schema);
			expect(props.onTrigger.mock.calls[0][1].properties).toBe(properties);
			expect(props.onTrigger.mock.calls[0][1].errors).toBe(errors);
			expect(props.onTrigger.mock.calls[0][1].schema).toBe(schema);
			expect(props.onTrigger.mock.calls[0][1].value).toBe(value);
		});
	});

	describe('#onSubmit', () => {
		const submitEvent = { preventDefault: jest.fn() };

		it('should prevent event default', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(submitEvent.preventDefault).toBeCalled();
		});

		it('should validate all fields', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.setErrors).toBeCalledWith(submitEvent, {
				firstname: 'Missing required field',
			});
		});

		it('should validate all fields with custom error messages', () => {
			const props2 = {
				...props,
				language: { OBJECT_REQUIRED: 'is required' },
			};
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props2} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.setErrors).toBeCalledWith(submitEvent, {
				firstname: 'is required',
			});
		});

		it('should not call submit callback when form is invalid', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.onSubmit).not.toBeCalled();
		});

		it('should call submit callback when form is valid', () => {
			// given
			const validProperties = {
				...data.properties,
				lastname: 'This has at least 10 characters',
				firstname: 'This is required',
			};
			const wrapper = mount(<UIFormComponent {...data} {...props} properties={validProperties} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.onSubmit).toBeCalled();
		});
	});
});
