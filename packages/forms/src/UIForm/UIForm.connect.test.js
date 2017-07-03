import React from 'react';
import { shallow, mount } from 'enzyme';

import { data, mergedSchema, initProps, initStore } from '../../__mocks__/data';
import UIForm from './UIForm.connect';

describe('UIForm connect', () => {
	let props;
	beforeEach(() => {
		props = initProps();
	});

	it('should render form', () => {
		// when
		const wrapper = shallow(
			<UIForm
				store={initStore(props.formName, data)}
				data={data}
				{...props}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should create form state on mount', () => {
		// given
		const store = initStore();

		// when
		mount(
			<UIForm
				store={store}
				data={data}
				{...props}
			/>
		);

		// then
		const actions = store.getActions();
		expect(actions.length).toBe(1);
		expect(actions[0]).toMatchSnapshot();
	});

	it('should remove form state on unmount', () => {
		// given
		const store = initStore();
		const wrapper = mount(
			<UIForm
				store={store}
				data={data}
				{...props}
			/>
		);
		expect(store.getActions().length).toBe(1);

		// when
		wrapper.unmount();

		// then
		const actions = store.getActions();
		expect(actions.length).toBe(2);
		expect(actions[1]).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should update state properties and errors', () => {
			// given
			const store = initStore(props.formName, data);
			const wrapper = mount(
				<UIForm
					store={store}
					data={data}
					{...props}
				/>
			);
			expect(store.getActions().length).toBe(1);
			const event = { target: { value: 'toto' } };

			// when
			wrapper.find('input').at(0).simulate('change', event);

			// then
			expect(store.getActions().length).toBe(2);
			expect(store.getActions()[1]).toMatchSnapshot();
		});

		it('should trigger onChange callback', () => {
			// given
			const store = initStore(props.formName, data);
			const wrapper = mount(
				<UIForm
					store={store}
					data={data}
					{...props}
				/>
			);
			const event = { target: { value: 'toto is toto' } };

			// when
			wrapper.find('input').at(0).simulate('change', event);

			// then
			expect(props.onChange).toBeCalledWith(
				expect.anything(),
				{
					formName: props.formName,
					schema: mergedSchema[0],
					value: 'toto is toto',
					error: null,
					properties: data.properties,
				}
			);
		});
	});
});
