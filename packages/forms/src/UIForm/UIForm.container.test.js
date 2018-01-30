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

	describe('#onChange', () => {
		it('should update state properties', () => {
			// given
			const wrapper = shallow(<UIForm data={data} {...props} />);
			const instance = wrapper.instance();

			// when
			instance.onChange(null, {
				schema: mergedSchema[0],
				value: 'toto',
			});

			// then
			expect(instance.state).toMatchSnapshot();
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
			instance.setErrors(errors);

			// then
			expect(instance.state).toMatchSnapshot();
		});
	});
});
