import React from 'react';
import { shallow } from 'enzyme';

import IncrementableScrollList from './IncrementableScrollList.component';

describe('IncrementableScrollList', () => {
	function getListWrapper(wrapper) {
		const autoSizerWrapper = wrapper
			.find('AutoSizer')
			.first()
			.shallow();

		const listWrapper = autoSizerWrapper
			.find('List')
			.first()
			.shallow();

		return listWrapper;
	}

	it('should render', () => {
		const wrapper = shallow(
			<IncrementableScrollList
				items={[]}
				itemRenderer={() => {}}
			/>
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should set List index scroll with 0 when "initialIndex" is not set', () => {
		const wrapper = shallow(
			<IncrementableScrollList
				items={[]}
				itemRenderer={() => {}}
			/>
		);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(0);
	});

	it('should set List index scroll based on "initialIndex"', () => {
		const wrapper = shallow(
			<IncrementableScrollList
				items={[]}
				itemRenderer={() => {}}
				initialIndex={161}
			/>
		);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(161);
	});

	it('should render items based on "itemRenderer"', () => {
		const itemRenderer = jest.fn();
		itemRenderer.mockReturnValue(
			<span>
				something
			</span>
		);

		const charlie = { id: 'charlie', label: 'charlie' };
		const wrapper = shallow(
			<IncrementableScrollList
				items={[
					{ id: 'alpha', label: 'alpha' },
					{ id: 'bravo', label: 'bravo' },
					charlie,
					{ id: 'delta', label: 'delta' },
				]}
				itemRenderer={itemRenderer}
			/>
		);

		const listWrapper = getListWrapper(wrapper);
		const rowRenderer = listWrapper.prop('rowRenderer');

		const rowRendered = rowRenderer({
			index: 2,
			key: 'whatever_uuid',
			style: {},
		});

		const rowWrapper = shallow(rowRendered);

		expect(itemRenderer).toHaveBeenCalledWith(charlie);
		expect(rowWrapper.find('span').first().text()).toBe('something');
	});

	describe('keep track of first visible row index', () => {
		it('should initialize first visible row index with 0 when "initialIndex" is no set', () => {
			const wrapper = shallow(
				<IncrementableScrollList
					items={[]}
					itemRenderer={() => {}}
				/>
			);

			expect(wrapper.state('startIndex')).toBe(0);
		});

		it('should initialize first visible row index based on "initialIndex"', () => {
			const wrapper = shallow(
				<IncrementableScrollList
					items={[]}
					itemRenderer={() => {}}
					initialIndex={42}
				/>
			);

			expect(wrapper.state('startIndex')).toBe(42);
		});

		it('should keep track of first visible row index when internally changed', () => {
			const wrapper = shallow(
				<IncrementableScrollList
					items={[]}
					itemRenderer={() => {}}
				/>
			);
			const listWrapper = getListWrapper(wrapper);
			const onRowsRendered = listWrapper.prop('onRowsRendered');

			expect(wrapper.state('startIndex')).toBe(0);
			onRowsRendered({
				startIndex: 36,
			});
			expect(wrapper.state('startIndex')).toBe(36);
		});
	});

	it('should scroll to the previous 5 items when clicking on the top button', () => {
		const items = Array(100).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={53}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-up');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(48);
	});

	it('should scroll to the next 5 items when clicking on the bottom button', () => {
		const items = Array(100).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={53}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-down');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(58);
	});

	it('should scroll to the minimum item available when clicking on the top button while at a range of it lower than the display items range', () => {
		const items = Array(58).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={2}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-up');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(0);
	});

	it('should scroll to the maximum item available when clicking on the bottom button while at a range of it lower than the display items range', () => {
		const items = Array(42).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={33}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-down');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(37);
	});

	it('should not scroll when clicking on the top button while already on minimum item', () => {
		const items = Array(98).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={0}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-up');

		action.simulate('click');

		expect(scrollToRow).not.toHaveBeenCalled();
	});

	it('should not scroll when clicking on the bottom button while already on maximum item', () => {
		const items = Array(96).fill();

		const wrapper = shallow(
			<IncrementableScrollList
				items={items}
				itemRenderer={() => {}}
				initialIndex={92}
			/>
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-down');

		action.simulate('click');

		expect(scrollToRow).not.toHaveBeenCalled();
	});
});
