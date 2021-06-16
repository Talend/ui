import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SelectSortBy from './SelectSortBy.component';

const id = 'toolbar-sort';
const field = 'id';
const requiredProps = {
	onChange: jest.fn(),
	options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
};

describe('SelectSortBy', () => {
	it('should render', () => {
		// given
		const props = {
			field,
			...requiredProps,
		};

		// when
		const wrapper = renderer.create(<SelectSortBy {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with no dropdown', () => {
		// given
		const props = {
			field,
			...requiredProps,
			options: [{ id: 'id', name: 'Id' }],
		};

		// when
		const wrapper = renderer.create(<SelectSortBy {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without field selected', () => {
		// when
		const wrapper = renderer.create(<SelectSortBy {...requiredProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// given
		const props = {
			id,
			field,
			...requiredProps,
		};

		// when
		const wrapper = renderer.create(<SelectSortBy {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should call toggle callback on sort-order click', () => {
		// given
		const props = {
			id,
			field,
			...requiredProps,
		};
		const event = { target: {} };

		// when
		const wrapper = shallow(<SelectSortBy {...props} />);

		wrapper
			.find('.tc-list-toolbar-order-chooser')
			.at(0)
			.simulate('click', event);

		// then
		expect(props.onChange).toBeCalledWith(event, {
			field: 'id',
			isDescending: true,
		});
	});
});
