import React from 'react';
import { mount } from 'enzyme';

import VList from './VList.component';
import VirtualizedList from '../../../VirtualizedList';
import { ListContext } from '../context';

describe('List VList', () => {
	it('should pass collection', () => {
		// given
		const contextValue = { collection: [{ id: 0 }, { id: 1 }], setColumns: jest.fn() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find(VirtualizedList).prop('collection')).toBe(contextValue.collection);
	});

	it('should pass displayMode from context in uncontrolled mode', () => {
		// given
		const contextValue = { displayMode: 'large', collection: [], setColumns: jest.fn() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find(VirtualizedList).prop('type')).toBe('LARGE');
	});

	it('should pass displayMode from props in controlled mode', () => {
		// given
		const contextValue = { displayMode: 'large', collection: [], setColumns: jest.fn() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList type="TABLE" />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find(VirtualizedList).prop('type')).toBe('TABLE');
	});

	it('Should not display column chooser by default', () => {
		// given
		const contextValue = { collection: [{ id: 0 }, { id: 1 }], setColumns: jest.fn() };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		expect(wrapper.exists('ColumnChooser')).toBe(false);
	});

	it('Should display column chooser from boolean', () => {
		const contextValue = {
			displayMode: 'table',
			collection: [],
			columns: [],
			setColumns: jest.fn(),
			setVisibleColumns: jest.fn(),
		};

		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList type="TABLE" columnChooser>
					<VList.Text label="Id" dataKey="id" />
					<VList.Text label="name" dataKey="name" />
				</VList>
			</ListContext.Provider>,
		);

		expect(wrapper.html()).toMatchSnapshot();

		expect(wrapper.find('ColumnChooser')).toHaveLength(1);
	});
});
