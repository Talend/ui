import React from 'react';
import { mount, shallow } from 'enzyme';
import HeaderBarComponent from './HeaderBar.component';

describe('HeaderBar', () => {
	it('should render', () => {
		const wrapper = mount(<HeaderBarComponent />);
		expect(wrapper.find('HeaderBar')).toBeDefined();
	});

	it('should render logo', () => {
		const logo = {
			id: 'logo',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(<HeaderBarComponent logo={logo} />);
		const element = wrapper.find('Logo').at(0).find('Button').at(0);
		expect(element).not.toBeUndefined();
		element.simulate('click');
		expect(logo.onClick).toHaveBeenCalled();
	});

	it('should render AppSwitcher component', () => {
		const brand = {
			id: 'brand',
			label: 'My App',
			onClick: jest.fn(),
		};
		const wrapper = mount(<HeaderBarComponent brand={brand} />);
		const element = wrapper.find('AppSwitcher');
		expect(element).not.toBeUndefined();
	});

	it('should render custom AppSwitcher component', () => {
		function AppSwitcher() {
			return null;
		}

		const wrapper = mount(<HeaderBarComponent AppSwitcher={AppSwitcher} />);
		const element = wrapper.find(AppSwitcher);
		expect(element).not.toBeUndefined();
	});

	it('should render custom Intercom component', () => {
		function Intercom() {
			return null;
		}

		const wrapper = mount(<HeaderBarComponent Intercom={Intercom} />);
		const element = wrapper.find(Intercom);
		expect(element).not.toBeUndefined();
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
		const wrapper = mount(<HeaderBarComponent search={search} />);
		const element = wrapper.find('Button[role="search"]');
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
		const wrapper = mount(<HeaderBarComponent help={help} />);
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
		const wrapper = mount(<HeaderBarComponent user={user} />);
		wrapper.find('button#user').simulate('click');
		wrapper.find('a#settings').simulate('click');
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
		const wrapper = mount(<HeaderBarComponent brand={brand} products={products} />);
		wrapper.find('button#brand').simulate('click');
		wrapper.find('a#tdp').simulate('click');
		expect(products.onSelect).toHaveBeenCalled();
	});

	it('should render intercom', () => {
		// when
		const wrapper = shallow(
			<HeaderBarComponent
				intercom={{ id: 'my-intercom', config: { app_id: 'e19c98d', email: 'lol@lol.com' } }}
			/>,
		);

		// then
		const intercomTrigger = wrapper
			.find('Intercom')
			.dive()
			.find('withI18nextTranslation(Intercom)');
		expect(intercomTrigger.length).toBe(1);
		expect(intercomTrigger.prop('className')). toContain(
			'tc-header-bar-intercom-default-component',
		);
		expect(intercomTrigger.prop('id')).toEqual('my-intercom');
		expect(intercomTrigger.prop('config')).toEqual({
			app_id: 'e19c98d',
			email: 'lol@lol.com',
			vertical_padding: 70,
		});
	});
});
