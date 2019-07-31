import React from 'react';
import { mount, shallow } from 'enzyme';
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
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should NOT render reorder control panel when value.isClosed is true', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				isClosed
				onRemove={jest.fn()}
				onReorder={jest.fn()}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should NOT render moveUp/moveDown with no reorder callback', () => {
		// when
		const wrapper = shallow(
			<ArrayItem
				hasMoveDown={false}
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should disable delete button', () => {
		let deleteAction;
		const renderItem = (index, { actions }) => {
			deleteAction = actions[0];
		};
		// when
		shallow(<ArrayItem id={'disabled-array-item'} renderItem={renderItem} disabled />);
		// then
		expect(deleteAction.disabled).toBe(true);
	});

	it('should trigger onRemove when remove button is clicked', () => {
		// given
		const onRemove = jest.fn();
		const wrapper = mount(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={onRemove}
				onReorder={jest.fn()}
			/>,
		);

		// when
		wrapper
			.find('Button#talend-control-3-delete')
			.first()
			.simulate('click');

		// then
		expect(onRemove).toBeCalledWith(expect.anything(), 3);
	});

	it('should not render the remove button in ArrayItem if the widget is closeable', () => {
		// It will be rendered inside the widget instead
		const wrapper = shallow(
			<ArrayItem hasMoveDown hasMoveUp id={'talend-control-3'} index={3} isCloseable />,
		);
		expect(wrapper.exists('Action')).toEqual(false);
	});

	it('should trigger onReorder when moveUp button is clicked', () => {
		// given
		const onReorder = jest.fn();
		const wrapper = mount(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
			/>,
		);

		// when
		wrapper
			.find('Button#talend-control-3-moveUp')
			.first()
			.simulate('click');

		// then
		expect(onReorder).toBeCalledWith(expect.anything(), { previousIndex: 3, nextIndex: 2 });
	});

	it('should trigger onReorder when moveDown button is clicked', () => {
		// given
		const onReorder = jest.fn();
		const wrapper = mount(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
			/>,
		);

		// when
		wrapper
			.find('Button#talend-control-3-moveDown')
			.first()
			.simulate('click');

		// then
		expect(onReorder).toBeCalledWith(expect.anything(), { previousIndex: 3, nextIndex: 4 });
	});
	it('should support readonly (do not display actions)', () => {
		// given
		const onReorder = jest.fn();
		const renderItem = jest.fn(() => null);
		// when
		const wrapper = mount(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id={'talend-control-3'}
				index={3}
				renderItem={renderItem}
				onRemove={jest.fn()}
				onReorder={onReorder}
				readOnly
			/>,
		);

		// then
		// can t find delete action
		expect(wrapper.find('Action').length).toBe(0);
		expect(renderItem).toHaveBeenCalledWith(3, { actions: [] });
	});
});
