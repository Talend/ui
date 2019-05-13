import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import ListManager from './ListManager.component';
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
			<ListManager>
				<ContextTestConsumer />
			</ListManager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass collection', () => {
		// given
		const collection = [{ id: 0 }, { id: 1 }];

		// when
		const wrapper = mount(
			<ListManager collection={collection}>
				<ContextTestConsumer />
			</ListManager>,
		);

		// then
		expect(wrapper.find(TestConsumer).prop('collection')).toBe(collection);
	});

	it('should propagate display mode', () => {
		// given
		const wrapper = mount(
			<ListManager collection={[{ id: 0 }, { id: 1 }]}>
				<ContextTestConsumer />
			</ListManager>,
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

	it('should propagate filter', () => {
		// given
		const wrapper = mount(
			<ListManager collection={[{ id: 0, name: 'toto' }, { id: 1, name: 'tata' }]}>
				<ContextTestConsumer />
			</ListManager>,
		);
		expect(wrapper.find(TestConsumer).prop('textFilter')).toBeUndefined();
		expect(wrapper.find(TestConsumer).prop('collection')).toEqual([
			{ id: 0, name: 'toto' },
			{ id: 1, name: 'tata' },
		]);

		const newFilter = 'toto';

		// when
		act(() => {
			const setTextFilter = wrapper.find(TestConsumer).prop('setTextFilter');
			setTextFilter(newFilter);
		});
		wrapper.update();

		// then
		expect(wrapper.find(TestConsumer).prop('textFilter')).toBe('toto');
		expect(wrapper.find(TestConsumer).prop('collection')).toEqual([{ id: 0, name: 'toto' }]);
	});

	it('should propagate sort', () => {
		// given
		const wrapper = mount(
			<ListManager collection={[{ id: 0, name: 'toto' }, { id: 1, name: 'tata' }]}>
				<ContextTestConsumer />
			</ListManager>,
		);
		expect(wrapper.find(TestConsumer).prop('sortParams')).toEqual({});
		expect(wrapper.find(TestConsumer).prop('collection')).toEqual([
			{ id: 0, name: 'toto' },
			{ id: 1, name: 'tata' },
		]);

		const newSortParams = { sortBy: 'name', isDescending: false };

		// when
		act(() => {
			const setSortParams = wrapper.find(TestConsumer).prop('setSortParams');
			setSortParams(newSortParams);
		});
		wrapper.update();

		// then
		expect(wrapper.find(TestConsumer).prop('sortParams')).toBe(newSortParams);
		expect(wrapper.find(TestConsumer).prop('collection')).toEqual([
			{ id: 1, name: 'tata' },
			{ id: 0, name: 'toto' },
		]);
	});
});
