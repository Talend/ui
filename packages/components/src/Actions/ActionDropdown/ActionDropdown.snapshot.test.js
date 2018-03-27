import React from 'react';
import renderer from 'react-test-renderer';

import ActionDropdown from './ActionDropdown.component';

const items = [
	{
		icon: 'talend-icon',
		label: 'document 1',
		onClick: jest.fn(),
	},
	{
		label: 'document 2',
		onClick: jest.fn(),
	},
];

describe('ActionDropdown', () => {
	it('should render a button with label', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
		};

		// when
		const wrapper = renderer.create(<ActionDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a button with icon and label', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
		};

		// when
		const wrapper = renderer.create(<ActionDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a button with icon', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items,
			tooltipPlacement: 'right',
			hideLabel: true,
		};

		// when
		const wrapper = renderer.create(<ActionDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a button with "link" theme', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items,
			link: true,
		};

		// when
		const wrapper = renderer.create(<ActionDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render "no option" item when items array is empty', () => {
		// given
		const props = {
			id: 'dropdown-id',
			label: 'related items',
			items: [],
		};

		// when
		const wrapper = renderer.create(<ActionDropdown {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
