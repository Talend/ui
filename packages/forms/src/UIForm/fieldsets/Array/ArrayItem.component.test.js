import React from 'react';
import { shallow } from 'enzyme';
import ArrayItem from './ArrayItem.component';

describe('Array Item component', () => {
	it('should render control panel with item content', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				value={{}}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should NOT render control panel when value.isClosed is true', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				value={{ isClosed: true }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should disable moveDown', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown={false}
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				value={{ }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should disable moveUp', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp={false}
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
				value={{ }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should trigger onRemove when remove button is clicked', () => {
		// given
		const onRemove = jest.fn();
		const event = { target: {} };
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={onRemove}
				onReorder={jest.fn()}
				value={{ }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// when
		wrapper.find('#talend-control-3-delete').simulate('click', event);

		// then
		expect(onRemove).toBeCalledWith(event, 3);
	});

	it('should trigger onReorder when moveUp button is clicked', () => {
		// given
		const onReorder = jest.fn();
		const event = { target: {} };
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
				value={{ }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// when
		wrapper.find('#talend-control-3-moveUp').simulate('click', event);

		// then
		expect(onReorder).toBeCalledWith(event, { previousIndex: 3, nextIndex: 2 });
	});

	it('should trigger onReorder when moveDown button is clicked', () => {
		// given
		const onReorder = jest.fn();
		const event = { target: {} };
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
				value={{ }}
			>
				<span>This is the item content</span>
			</ArrayItem>
		);

		// when
		wrapper.find('#talend-control-3-moveDown').simulate('click', event);

		// then
		expect(onReorder).toBeCalledWith(event, { previousIndex: 3, nextIndex: 4 });
	});
});
