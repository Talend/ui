import React from 'react';
import i18n from 'i18next';
import { shallow, mount } from 'enzyme';
import { actions, data, mergedSchema, initProps } from '../../__mocks__/data';

import UIForm from './UIForm.component';

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
		const wrapper = shallow(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);

		// then
		expect(wrapper.find('TalendUIForm').dive().getElement()).toMatchSnapshot();
	});

	it('should render provided actions', () => {
		// when
		const wrapper = shallow(<UIForm
			{...data}
			{...props}
			i18n={i18n}
			t={key => key}
			actions={actions}
		/>);

		// then
		expect(wrapper.find('TalendUIForm').dive().getElement()).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should call onChange callback', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);
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
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} properties={{ firstname: 'to' }} />);
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
			const wrapper = mount(<UIForm {...validData} {...props} i18n={i18n} t={key => key} />);
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
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);
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
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);
			const newValue = 'toto is toto';
			const event = { target: { value: newValue } };
			const newErrors = { lastname: 'lol' };
			props.onTrigger.mockReturnValueOnce(Promise.resolve({}));

			// when
			wrapper.find('TalendUIForm').instance().onFinish(
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
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);

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
	});

	describe('#onSubmit', () => {
		const submitEvent = { preventDefault: jest.fn() };

		it('should prevent event default', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);

			// when
			wrapper.find('TalendUIForm').instance().onSubmit(submitEvent);

			// then
			expect(submitEvent.preventDefault).toBeCalled();
		});

		it('should validate all fields', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);

			// when
			wrapper.find('TalendUIForm').instance().onSubmit(submitEvent);

			// then
			expect(props.setErrors).toBeCalledWith(submitEvent, { firstname: 'Missing required property: firstname' });
		});

		it('should not call submit callback when form is invalid', () => {
			// given
			const wrapper = mount(<UIForm {...data} {...props} i18n={i18n} t={key => key} />);

			// when
			wrapper.find('TalendUIForm').instance().onSubmit(submitEvent);

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
			const wrapper = mount(<UIForm
				{...data}
				{...props}
				i18n={i18n}
				t={key => key}
				properties={validProperties}
			/>);

			// when
			wrapper.find('TalendUIForm').instance().onSubmit(submitEvent);

			// then
			expect(props.onSubmit).toBeCalled();
		});
	});
});
