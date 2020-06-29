import React from 'react';
import { shallow } from 'enzyme';

import SortOptions, { TYPES, ORDERS } from './SortOptions.component';

describe('SortOptions component snaps', () => {
	it('should render SortOptions in default mode', () => {
		const props = {
			onChange: () => {},
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render SortOptions with name in ASC mode', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.DESC,
				[TYPES.NAME]: ORDERS.ASC,
			},
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render SortOptions with date in ASC mode', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render SortOptions with only the date type', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [TYPES.DATE],
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render SortOptions with only the name type', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [TYPES.NAME],
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should not render SortOptions when no type is specified', () => {
		const props = {
			onChange: () => {},
			orders: {
				[TYPES.DATE]: ORDERS.ASC,
				[TYPES.NAME]: ORDERS.DESC,
			},
			types: [],
		};

		const wrapper = shallow(<SortOptions {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
