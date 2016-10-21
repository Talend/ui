import React from 'react';
import renderer from 'react-test-renderer';
import AppHeaderBar from './AppHeaderBar.component';

jest.mock('react-dom');

const props = {
	app: 'Example App Name',
	brandLink: {
		title: 'my brand title',
		className: 'my-brand-class',
		onClick: jest.fn(),
	},
	content: [
		{
			navs: [
				{
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-bars', name: 'hello', onClick: jest.fn() },
						},
					],
				},
				{
					nav: { pullRight: true },
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-heart', name: 'world', onClick: jest.fn() },
						},
						{
							type: 'dropdown',
							item: {
								dropdown: {
									id: 'myDropdown',
									title: 'user 1',
									onSelect: jest.fn(),
								},
								items: [
									{ icon: 'fa fa-fw fa-cog', name: 'settings', onClick: jest.fn() },
								],
							},
						},
					],
				},
			],
		},
		{
			forms: [{
				form: {
					pullRight: true,
					onSubmit: jest.fn(),
				},
				formgroups: [
					{
						formgroup: {
							controlId: 'globalSearch',
						},
						formcontrol: {
							type: 'text',
							placeholder: 'search anything',
							onChange: jest.fn(),
						},
					},
				],
				button: {
					onClick: jest.fn(),
				},
				buttonLabel: 'Save',
				icon: 'fa fa-search',
			}],
		},
	],
};

describe('AppHeaderBar', () => {
	it('should render', () => {
		// given
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});
	it('should render wihtout brandLink', () => {
		// given
		const myprops = Object.assign({}, props);
		delete myprops.brandLink;
		const appBar = <AppHeaderBar {...myprops} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});
});
