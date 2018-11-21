import React from 'react';
import { shallow } from 'enzyme';
import RowRenderer from './RowRenderer.component';

describe('RowRenderer', () => {
	const onSelect = jest.fn();
	const items = [
		{ id: 0, label: 'item-0' },
		{ id: 1, label: 'item-1' },
		{ id: 2, label: 'item-2' },
		{ id: 3, label: 'item-3' },
	];
	const props = {
		index: 2,
		key: 'second-item',
		parent: {
			props: {
				items,
				onSelect,
				selectedItemId: 2,
			},
		},
		style: { display: 'flex' },
	};

	it('should render', () => {
		// when
		const wrapper = shallow(<RowRenderer {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should select element on click', () => {
		// given
		const wrapper = shallow(<RowRenderer {...props} />);
		expect(onSelect).not.toBeCalled();

		// when
		const mockedEvent = {
			whatever: 'prop',
		};
		wrapper.simulate('click', mockedEvent);

		// then
		expect(onSelect).toHaveBeenCalledWith(mockedEvent, items[props.index]);
	});
});
