import React from 'react';
import { shallow, mount } from 'enzyme';
import HeaderBarComponent from './HeaderBar.component';

describe('HeaderBar', () => {
	function t(msgid, options = {}) {
		return options.defaultValue || msgid;
	}
	it('should render nav without props', () => {
		const wrapper = mount(<HeaderBarComponent.WrappedComponent />);
		expect(wrapper.find('.theme-tc-header-bar').type()).toBe('nav');
	});
	it('should render logo', () => {
		const logo = {
			id: 'logo',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(<HeaderBarComponent.WrappedComponent logo={logo} t={t} />);
		const element = wrapper.find('Action#logo');
		expect(element).not.toBeUndefined();
		element.simulate('click');
		expect(logo.onClick).toHaveBeenCalled();
	});
	it('should render brand', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(<HeaderBarComponent.WrappedComponent t={t} brand={brand} />);
		const element = wrapper.find('Action.tc-header-bar-brand');
		expect(element).not.toBeUndefined();
		element.simulate('click');
		expect(brand.onClick).toHaveBeenCalled();
	});
	it('should render search', () => {
		const search = {
			id: 'search',
			onToggle: jest.fn(),
			docked: true,
			icon: {
				name: 'talend-search',
				title: 'Search',
				bsStyle: 'link',
				tooltipPlacement: 'bottom',
			},
		};
		const wrapper = mount(<HeaderBarComponent.WrappedComponent t={t} search={search} />);
		const element = wrapper.find('Action[role="search"]');
		expect(element).not.toBeUndefined();
		element.simulate('click');
		expect(search.onToggle).toHaveBeenCalled();
	});
	it('should render help', () => {
		const help = {
			id: 'help',
			onClick: jest.fn(),
			icon: 'talend-icon',
		};
		const wrapper = mount(<HeaderBarComponent.WrappedComponent t={t} help={help} />);
		const element = wrapper.find('Action#help');
		expect(element).not.toBeUndefined();
		element.simulate('click');
		expect(help.onClick).toHaveBeenCalled();
	});
	it('should render user', () => {
		const user = {
			id: 'user',
			items: [
				{
					id: 'settings',
					icon: 'talend-cog',
					label: 'Settings',
					onClick: jest.fn(),
				},
			],
			name: 'John Doe',
			firstName: 'John',
			lastName: 'Doe',
		};
		const wrapper = mount(<HeaderBarComponent.WrappedComponent t={t} user={user} />);
		const element = wrapper.find('ActionDropdown#user');
		element.simulate('click');
		element.find('a#settings').simulate('click');
		expect(user.items[0].onClick).toHaveBeenCalled();
	});
	it('should render products', () => {
		const products = {
			items: [
				{
					icon: 'talend-tdp-colored',
					key: 'tdp',
					id: 'tdp',
					label: 'Data Preparation',
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
			onSelect: jest.fn(),
		};
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(
			<HeaderBarComponent.WrappedComponent t={t} brand={brand} products={products} />,
		);
		const element = wrapper.find('button#brand');
		element.simulate('click');
		wrapper.find('a#tdp').simulate('click');
		expect(products.onSelect).toHaveBeenCalled();
	});
});
