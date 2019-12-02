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

	it('should render form in text display mode', () => {
		// when
		const wrapper = shallow(<UIFormComponent {...data} {...props} displayMode="text" />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided actions', () => {
		// when
		const wrapper = shallow(<UIFormComponent {...data} {...props} actions={actions} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should not render any div if an empty "actions" array is provided', () => {
		const wrapper = shallow(<UIFormComponent {...data} {...props} actions={[]} />);
		const buttonsWrapper = wrapper.find('div.tf-actions-wrapper');
		expect(buttonsWrapper).toHaveLength(0);
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

	describe('#onSubmitEnter & #onSubmitLeave', () => {
		it('should call onSubmitEnter and onSubmitLeave when provided', () => {
			const enter = jest.fn();
			const leave = jest.fn();
			const properties = { hihi: 'hoho' };
			const wrapper = mount(
				<UIFormComponent
					{...data}
					{...props}
					properties={properties}
					onSubmitEnter={enter}
					onSubmitLeave={leave}
				/>,
			);
			const btn = wrapper.find('button').at(1);

			btn.simulate('mouseenter');
			expect(enter).toHaveBeenCalledWith(expect.anything(), properties);

			btn.simulate('mouseleave');
			expect(leave).toHaveBeenCalled();
		});
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
			wrapper.find('input[id="myFormId_firstname"]').simulate('blur');

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

		it('should set errors, with deep validation', () => {
			// given
			const wrapper = shallow(<UIFormComponent {...data} {...props} />);
			const event = { target: {} };
			const schema = {
				key: ['what'],
				schema: {
					type: 'object',
					required: ['value'],
					properties: {
						operator: {
							type: 'string',
							enum: ['>', '<', '='],
							value: { type: 'string' },
						},
					},
				},
				items: [
					{
						key: ['what', 'operator'],
						schema: { type: 'string', enum: ['>', '<', '='] },
						title: 'operator',
						type: 'select',
					},
					{
						key: ['what', 'value'],
						required: true,
						schema: { type: 'string' },
						title: 'value',
						type: 'text',
					},
				],
				widget: 'comparator',
			};

			// when
			wrapper
				.instance()
				.onFinish(
					event,
					{ schema, value: { operator: '<', value: undefined } },
					{ deepValidation: true },
				);

			// then
			expect(props.setErrors).toBeCalledWith(event, {
				what: 'Missing required field',
				'what,value': 'Missing required field',
			});
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
			expect(props.setErrors).toBeCalledWith(
				submitEvent,
				{
					firstname: 'Missing required field',
				},
				expect.anything(),
			);
		});

		it('should validate all fields with existing errors', () => {
			// given
			const dataProperties = { lastname: 'dupont' };
			const errors = {
				lastname: 'String is too short (6 chars), minimum 10',
				check: 'error added via a trigger',
				hiddenField: 'this is a hidden error',
			};
			// props.errors.lastname =
			const wrapper = shallow(
				<UIFormComponent {...data} properties={dataProperties} errors={errors} {...props} />,
			);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.setErrors).toBeCalledWith(
				submitEvent,
				{
					firstname: 'Missing required field',
					lastname: 'String is too short (6 chars), minimum 10',
					check: 'error added via a trigger',
				},
				expect.anything(),
			);
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
			expect(props.setErrors).toBeCalledWith(
				submitEvent,
				{
					firstname: 'is required',
				},
				expect.anything(),
			);
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
			expect(props.setErrors).toHaveBeenCalledWith(submitEvent, {}, undefined);
		});

		it('should focus the first element in error after submit', () => {
			// given
			const wrapper = mount(
				<UIFormComponent {...data} {...props} errors={{ firstname: 'firstname is required' }} />,
			);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(document.activeElement.getAttribute('id')).toBe('myFormId_lastname');
			expect(props.setErrors).toBeCalled();
			props.setErrors.mock.calls[0][2]();
			expect(document.activeElement.getAttribute('id')).toBe('myFormId_firstname');
			expect(document.activeElement.getAttribute('aria-invalid')).toBe('true');
		});
	});
});
