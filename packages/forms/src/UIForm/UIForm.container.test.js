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
		expect(
			wrapper // eslint-disable-line no-underscore-dangle
				.instance().state,
		).toMatchSnapshot();
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('#componentWillReceiveProps', () => {
		it('should update state if form data structure changed', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);

			const previousState = wrapper.state();

			// when
			wrapper.setProps({
				data: Object.assign({}, data),
			});

			// then
			expect(wrapper.state()).not.toBe(previousState);
		});

		it("should not update state if form data structure didn't change", () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);

			const previousState = wrapper.state();

			// when
			wrapper.setProps({
				whateverOtherThanData: 'something',
			});

			// then
			expect(wrapper.state()).toBe(previousState);
		});
	});

	describe('#onChange', () => {
		it('should update state properties', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
			const properties = { lastname: 'toto' };

			// when
			instance.onChange(null, {
				schema: mergedSchema[0],
				value: 'toto',
				properties,
			});

			// then
			expect(instance.state.liveState.properties).toEqual(properties);
		});

		it('should call onChange callback', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
			const event = { target: {} };
			const payload = {
				schema: mergedSchema[0],
				value: 'toto',
				properties: { lastname: 'toto' },
			};

			// when
			instance.onChange(event, payload);

			// then
			expect(props.onChange).toBeCalledWith(event, payload);
		});

		it('should trigger onChange callback', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
			const event = { target: {} };

			// when
			instance.onChange(event, {
				schema: mergedSchema[0],
				value: 'toto',
			});

			// then
			expect(props.onChange).toBeCalledWith(event, {
				schema: mergedSchema[0],
				value: 'toto',
				properties: props.properties,
			});
		});
	});

	describe('#setErrors', () => {
		it('should update state errors', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();
			const errors = { firstname: 'my firstname is invalid' };

			// when
			instance.setErrors(null, errors);

			// then
			expect(instance.state.liveState.errors).toEqual(errors);
		});
	});

	describe('#onTrigger', () => {
		it('should call onTrigger from props', () => {
			// given
			const onTrigger = jest.fn(() => Promise.resolve({}));
			const wrapper = shallow(<UIForm data={data} {...props} onTrigger={onTrigger} />);
			const instance = wrapper.instance();
			expect(onTrigger).not.toBeCalled();

			const event = { target: {} };
			const payload = {
				properties: {},
				schema: {},
			};

			// when
			instance.onTrigger(event, payload);

			// then
			expect(onTrigger).toBeCalledWith(event, payload);
		});

		it('should update state errors', done => {
			// given
			const errors = { firstname: 'my firstname is invalid' };
			const onTrigger = jest.fn(() => Promise.resolve({ errors }));
			const wrapper = shallow(<UIForm data={data} {...props} onTrigger={onTrigger} />);
			const instance = wrapper.instance();

			// when
			const triggerPromise = instance.onTrigger();

			// then
			triggerPromise.then(() => {
				expect(instance.state.liveState.errors).toBe(errors);
				done();
			});
		});
	});
});
