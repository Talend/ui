import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import VirtualizedList from '../VirtualizedList.component';
import ListTable from './ListTable.component';
import collection from '../collection';

describe('ListGrid', () => {
	it('should render react-virtualized table', () => {
		// when
		const wrapper = shallow(
			<ListTable collection={collection} height={600} id={'my-list'} width={1024}>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
				<VirtualizedList.Content label="" dataKey="description" />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.getElement().props.rowRenderer.displayName).not.toBe('RowSelection(undefined)');
	});

	it('should render react-virtualized table without header', () => {
		// when
		const wrapper = shallow(
			<ListTable collection={collection} height={600} id={'my-list'} width={1024} disableHeader>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
				<VirtualizedList.Content label="" dataKey="description" />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render table with sort props', () => {
		// when
		const wrapper = shallow(
			<ListTable
				collection={collection}
				height={600}
				id={'my-list'}
				sort={jest.fn()}
				sortBy={'name'}
				sortDirection={'DESC'}
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
				<VirtualizedList.Content label="" dataKey="description" />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should enhance the default rowRenderer with selection Higher Order renderer', () => {
		// when
		const wrapper = shallow(
			<ListTable
				collection={collection}
				height={600}
				id={'my-list'}
				isActive={jest.fn()}
				isSelected={jest.fn()}
				onRowClick={jest.fn()}
				onRowDoubleClick={jest.fn()}
				selectionToggle={jest.fn()}
				width={1024}
			>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
			</ListTable>,
		);

		// then
		expect(wrapper.getElement().props.rowRenderer.displayName).toBe('RowSelection(undefined)');
	});

	it('should render noRows', () => {
		// when
		const wrapper = mount(
			<ListTable
				collection={[]}
				height={600}
				id={'my-list'}
				isSelected={jest.fn()}
				selectionToggle={jest.fn()}
				width={1024}
				noRowsRenderer={() => <div>No rows</div>}
			>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
			</ListTable>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should not trigger double click callbacks on action double click', () => {
		// given
		const onRowDoubleClick = jest.fn();
		const checkboxEvent = { target: { tagName: 'span', classname: 'tc-cell-checkbox' } }; // click on the span that hides the input
		const inputEvent = { target: { tagName: 'input' } };
		const textareaEvent = { target: { tagName: 'textarea' } };
		const buttonEvent = { target: { tagName: 'button' } };
		const selectEvent = { target: { tagName: 'select' } };
		const innerActionEvent = { target: { tagName: 'span', parentElement: { tagName: 'button' } } };
		const nonActionEvent = { target: { tagName: 'span', parentElement: { tagName: 'span' } } };

		const wrapper = shallow(
			<ListTable
				collection={[]}
				height={600}
				id={'my-list'}
				width={1024}
				onRowDoubleClick={onRowDoubleClick}
			>
				<VirtualizedList.Content label="Id" dataKey="id" />
				<VirtualizedList.Content label="Name" dataKey="name" />
			</ListTable>,
		);

		// when / then
		wrapper.props().onRowDoubleClick({ event: inputEvent });
		expect(onRowDoubleClick).not.toBeCalled();

		wrapper.props().onRowDoubleClick({ event: textareaEvent });
		expect(onRowDoubleClick).not.toBeCalled();

		wrapper.props().onRowDoubleClick({ event: buttonEvent });
		expect(onRowDoubleClick).not.toBeCalled();

		wrapper.props().onRowDoubleClick({ event: selectEvent });
		expect(onRowDoubleClick).not.toBeCalled();

		wrapper.props().onRowDoubleClick({ event: innerActionEvent });
		expect(onRowDoubleClick).not.toBeCalled();

		wrapper.props().onRowDoubleClick({ event: nonActionEvent });
		expect(onRowDoubleClick).toBeCalled();
	});
});
