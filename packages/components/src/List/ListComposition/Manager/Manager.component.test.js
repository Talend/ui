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

	describe('display mode', () => {
		it('should manage uncontrolled display mode', () => {
			// given
			const wrapper = mount(
				<Manager collection={[{ id: 0 }, { id: 1 }]}>
					<ContextTestConsumer />
				</Manager>,
			);
			expect(wrapper.find(TestConsumer).prop('displayMode')).toBeUndefined();

			const event = { target: {} };
			const newDisplayMode = 'large';

			// when
			act(() => {
				const onDisplayModeChange = wrapper.find(TestConsumer).prop('onDisplayModeChange');
				onDisplayModeChange(event, newDisplayMode);
			});
			wrapper.update();

			// then
			expect(wrapper.find(TestConsumer).prop('displayMode')).toBe(newDisplayMode);
		});

		it('should manage controlled display mode', () => {
			// given
			const onDisplayModeChange = jest.fn();
			const wrapper = mount(
				<Manager
					collection={[{ id: 0 }, { id: 1 }]}
					onDisplayModeChange={onDisplayModeChange}
					displayMode="table"
				>
					<ContextTestConsumer />
				</Manager>,
			);
			expect(wrapper.find(TestConsumer).prop('displayMode')).toBe('table');
			expect(onDisplayModeChange).not.toBeCalled();

			const event = { target: {} };
			const newDisplayMode = 'large';

			// when
			wrapper.find(TestConsumer).prop('onDisplayModeChange')(event, newDisplayMode);
			wrapper.update();

			// then
			expect(wrapper.find(TestConsumer).prop('displayMode')).toBe('table');
			expect(onDisplayModeChange).toBeCalledWith(event, newDisplayMode);

			// when
			wrapper.setProps({ displayMode: newDisplayMode });

			// then
			expect(wrapper.find(TestConsumer).prop('displayMode')).toBe(newDisplayMode);
		});
	});
});
