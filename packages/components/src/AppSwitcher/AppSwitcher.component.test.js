import React from 'react';
import { mount } from 'enzyme';
import AppSwitcher from './AppSwitcher.component';

describe('AppSwitcher', () => {
	it('should render the products', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
			items: [
				{
					icon: 'talend-tdp-colored',
					key: 'tdp',
					label: 'Data Preparation',
					onClick: jest.fn(),
				},
				{
					icon: 'talend-tic-colored',
					key: 'tic',
					label: 'Integration Cloud',
				},
				{
					icon: 'talend-tmc-colored',
					key: 'tmc',
					label: 'Management Console',
				},
			],
		};
		const wrapper = mount(<AppSwitcher {...brand} />);
		expect(wrapper.html()).toMatchSnapshot();

		expect(wrapper.find('ActionDropdown')).not.toBeUndefined();

		wrapper.find('a').at(0).simulate('click');
		expect(brand.items[0].onClick).toHaveBeenCalled();

		wrapper.find('Button').at(0).simulate('click');

		expect(brand.onClick).not.toHaveBeenCalled();
	});

	it('should render with a Action', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(<AppSwitcher {...brand} />);
		expect(wrapper.find('Action')).not.toBeUndefined();
		wrapper.find('Button').at(0).simulate('click');
		expect(brand.onClick).toHaveBeenCalled();
	});

	it('should separated the component', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
			isSeparated: true,
		};
		const wrapper = mount(<AppSwitcher {...brand} />);

		expect(wrapper.find('li').prop('className').includes('separated')).toBeTruthy();
	});
});
