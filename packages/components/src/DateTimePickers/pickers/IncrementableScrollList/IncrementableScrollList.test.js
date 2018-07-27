import React from 'react';
import { mount, shallow } from 'enzyme';

import IncrementableScrollList from './IncrementableScrollList.component';

jest.mock(
	'react-virtualized/dist/commonjs/AutoSizer/AutoSizer',
	() =>
		// eslint-disable-next-line react/prop-types
		function AutoSizer({ children, ...props }) {
			return (
				<div id="autoSizer" {...props}>
					{children({ height: 300, width: 300 })}
				</div>
			);
		},
);

const items = Array(100).fill();
const OFFSET_TO_CENTER = 2;

describe('IncrementableScrollList', () => {
	function getListWrapper(wrapper) {
		return wrapper
			.find('AutoSizer')
			.first()
			.dive()
			.find('List')
			.first()
			.shallow();
	}

	it('should render', () => {
		const wrapper = shallow(<IncrementableScrollList items={items} onSelect={jest.fn()} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should set List index scroll with 0 when "initialIndex" is not set', () => {
		const wrapper = shallow(<IncrementableScrollList items={items} onSelect={jest.fn()} />);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(0);
	});

	it('should scroll to center on "initialIndex"', () => {
		const wrapper = shallow(
			<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={61} />,
		);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(61 - OFFSET_TO_CENTER);
	});

	it('should scroll based on "initialIndex" keeping it in boundaries when lt 0', () => {
		const wrapper = shallow(
			<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={-5} />,
		);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(0);
	});

	it('should scroll based on "initialIndex" keeping it in boundaries when gt items number', () => {
		const wrapper = shallow(
			<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={150} />,
		);

		const listWrapper = getListWrapper(wrapper);

		expect(listWrapper.prop('scrollToIndex')).toBe(95);
	});

	it('should render items', () => {
		const charlie = { id: 'charlie', label: 'charlie' };
		const wrapper = mount(
			<IncrementableScrollList
				items={[
					{ id: 'alpha', label: 'alpha' },
					{ id: 'bravo', label: 'bravo' },
					charlie,
					{ id: 'delta', label: 'delta' },
				]}
				onSelect={jest.fn()}
			/>,
		);
		expect(wrapper.find('PickerAction').length).toBe(4);
	});

	describe('keep track of first visible row index', () => {
		it('should initialize first visible row index with 0 when "initialIndex" is no set', () => {
			const wrapper = shallow(<IncrementableScrollList items={items} onSelect={jest.fn()} />);

			expect(wrapper.state('startIndex')).toBe(0);
		});

		it('should initialize first visible row index based on "initialIndex"', () => {
			const wrapper = shallow(
				<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={42} />,
			);

			expect(wrapper.state('startIndex')).toBe(42 - OFFSET_TO_CENTER);
		});

		it('should keep track of first visible row index when internally changed', () => {
			const wrapper = shallow(<IncrementableScrollList items={items} onSelect={jest.fn()} />);
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
		const wrapper = shallow(
			<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={53} />,
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-up');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(53 - OFFSET_TO_CENTER - 5);
	});

	it('should scroll to the next 5 items when clicking on the bottom button', () => {
		const wrapper = shallow(
			<IncrementableScrollList items={items} onSelect={jest.fn()} initialIndex={53} />,
		);

		const scrollToRow = jest.fn();

		wrapper.instance().setListRef({
			scrollToRow,
		});

		const action = wrapper.find('IconButton.tc-incrementable-scroll-list-action-down');

		action.simulate('click');

		expect(scrollToRow).toHaveBeenCalledWith(53 - OFFSET_TO_CENTER + 5);
	});

	it('should scroll to the minimum item available when clicking on the top button while at a range of it lower than the display items range', () => {
		const itemsSpecific = Array(58).fill();

		const wrapper = shallow(
			<IncrementableScrollList items={itemsSpecific} onSelect={jest.fn()} initialIndex={3} />,
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
		const itemsSpecific = Array(42).fill();

		const wrapper = shallow(
			<IncrementableScrollList items={itemsSpecific} onSelect={jest.fn()} initialIndex={34} />,
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
		const itemsSpecific = Array(98).fill();

		const wrapper = shallow(
			<IncrementableScrollList items={itemsSpecific} onSelect={jest.fn()} initialIndex={0} />,
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
		const itemsSpecific = Array(96).fill();

		const wrapper = shallow(
			<IncrementableScrollList items={itemsSpecific} onSelect={jest.fn()} initialIndex={96} />,
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
