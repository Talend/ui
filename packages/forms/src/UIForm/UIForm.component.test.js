import React from 'react';
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
		const wrapper = shallow(<UIForm {...data} {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided actions', () => {
		// when
		const wrapper = shallow(<UIForm {...data} {...props} actions={actions} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
			const wrapper = shallow(<UIForm {...data} {...props} />);
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
				trigger: 'after',
				schema: mergedSchema[2],
			});
		});
	});

	describe('#onSubmit', () => {
		const submitEvent = { preventDefault: jest.fn() };

		it('should prevent event default', () => {
			// given
			const wrapper = shallow(<UIForm {...data} {...props} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(submitEvent.preventDefault).toBeCalled();
		});

		it('should validate all fields', () => {
			// given
			const wrapper = shallow(<UIForm {...data} {...props} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.setErrors).toBeCalledWith(
				submitEvent,
				{ firstname: 'Missing required field' }
			);
		});

		it('should not call submit callback when form is invalid', () => {
			// given
			const wrapper = shallow(<UIForm {...data} {...props} />);

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
			const wrapper = shallow(<UIForm {...data} {...props} properties={validProperties} />);

			// when
			wrapper.instance().onSubmit(submitEvent);

			// then
			expect(props.onSubmit).toBeCalled();
		});
	});
});
