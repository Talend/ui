import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Manager from './Manager.component';
import { ListContext } from '../context';

function TestConsumer() {
	return <div />;
}

function ContextTestConsumer() {
	const context = useContext(ListContext);
	return <TestConsumer {...context} />;
}

describe('List Manager', () => {
	it('should display children', () => {
		// when
		const wrapper = mount(
			<Manager>
				<ContextTestConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass collection', () => {
		// given
		const collection = [{ id: 0 }, { id: 1 }];

		// when
		const wrapper = mount(
			<Manager collection={collection}>
				<ContextTestConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.find(TestConsumer).prop('collection')).toBe(collection);
	});

	it('should propagate display mode', () => {
		// given
		const wrapper = mount(
			<Manager collection={[{ id: 0 }, { id: 1 }]}>
				<ContextTestConsumer />
			</Manager>,
		);
		expect(wrapper.find(TestConsumer).prop('displayMode')).toBeUndefined();

		const newDisplayMode = 'large';

		// when
		act(() => {
			const setDisplayMode = wrapper.find(TestConsumer).prop('setDisplayMode');
			setDisplayMode(newDisplayMode);
		});
		wrapper.update();

		// then
		expect(wrapper.find(TestConsumer).prop('displayMode')).toBe(newDisplayMode);
	});
});
