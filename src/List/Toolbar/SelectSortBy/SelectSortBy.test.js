import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SelectSortBy from './SelectSortBy.component';

describe('SelectSortBy', () => {
	it('should render', () => {
		// given
		const props = {
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'name', name: 'Name' },
			],
			sortBy: 'id',
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without sortBy selected', () => {
		// given
		const props = {
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'label', name: 'Label' },
			],
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// given
		const props = {
			id: 'toolbar',
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'name', name: 'Name' },
			],
			sortBy: 'id',
		};

		// when
		const wrapper = renderer.create(
			<SelectSortBy {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should call toggle callback on sort-order click', () => {
		// given
		const props = {
			id: 'toolbar',
			onSelectSortBy: jest.fn(),
			sortOptions: [
				{ id: 'id', name: 'Name' },
				{ id: 'name', name: 'Name' },
			],
			sortBy: 'id',
		};
		const event = { target: {} };

		// when
		const wrapper = shallow(<SelectSortBy {...props} />);
		wrapper.find('#toolbar-sort-order').simulate('click', event);

		// then
		expect(props.onSelectSortBy).toBeCalledWith(event, {
			sortBy: 'id',
			sortDesc: true,
		});
	});
});
