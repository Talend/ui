/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable no-console */
import React from 'react';
import Dropdown from './';

import { ButtonTertiary } from '../../components/Button';
import { IconsProvider } from '../../components/IconsProvider';

const WithIcons = () => (
	<Dropdown
		aria-label="Switch between Talend applications"
		items={[
			{
				icon: 'talend-tdp-colored',
				label: 'Link with icon',
				href: 'https://tdp.cloud.talend.com',
				type: 'link',
			},
			{
				icon: 'talend-tmc-colored',
				label: 'Button with icon',
				onClick: () => console.log('fou'),
				type: 'button',
			},
		]}
	>
		<ButtonTertiary isDropdown onClick={() => {}}>
			App switcher
		</ButtonTertiary>
	</Dropdown>
);

const WithDividers = () => (
	<Dropdown
		aria-label="Custom menu"
		items={[
			{
				label: 'External link',
				href: 'https://community.talend.com/s/?language=en_US',
				target: '_blank',
				type: 'link',
			},
			{
				type: 'divider',
			},
			{
				label: 'Link',
				href: '/download',
				type: 'link',
			},
			{
				label: 'Another link',
				href: '/user',
				type: 'link',
			},
			{
				type: 'divider',
			},
			{
				label: 'Button',
				onClick: () => console.log('click'),
				type: 'button',
			},
		]}
	>
		<ButtonTertiary isDropdown onClick={() => {}}>
			Dropdown
		</ButtonTertiary>
	</Dropdown>
);

context('<Dropdown />', () => {
	it('should render', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').should('be.visible');
	});

	it('should display menu', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menu').should('be.visible');
		cy.findByTestId('dropdown.menuitem.Link with icon-0').should('be.visible');
		cy.findByTestId('dropdown.menuitem.Button with icon-1').should('be.visible');
		cy.get('body').click(0, 0);
		cy.findByTestId('dropdown.menu').should('not.be.visible');
	});

	it('should hide the menu clicking on a button', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menu').should('be.visible');
		cy.findByTestId('dropdown.menuitem.Button with icon-1').click();
		cy.findByTestId('dropdown.menu').should('not.be.visible');
	});

	it('should hide the menu clicking on a link', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menu').should('be.visible');
		cy.get('a[data-test="dropdown.menuitem.Link with icon-0"]').invoke('removeAttr', 'href');
		cy.get('a[data-test="dropdown.menuitem.Link with icon-0"]').click();
		cy.findByTestId('dropdown.menu').should('not.be.visible');
	});

	it('should display menu with keyboard', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').type(' ');
		cy.findByTestId('dropdown.menu').should('be.visible');
		cy.findByTestId('dropdown.button').type('{esc}');
		cy.findByTestId('dropdown.menu').should('not.be.visible');
	});

	it('should navigate through the menu with keyboard', () => {
		cy.mount(<WithIcons />);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menu').should('be.visible');
		// Let's highlight the second menu item
		cy.get('body').type('{downArrow}{downArrow}');
		// And verify that's focused
		cy.findByTestId('dropdown.menuitem.Button with icon-1').should('be.attr', 'tabindex', 0);
	});

	it('should have separators', () => {
		cy.mount(<WithDividers />);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menu')
			.should('be.visible')
			.within(() => {
				// eslint-disable-next-line testing-library/prefer-screen-queries
				cy.findAllByRole('separator').should('have.length', 2);
			});
	});

	it('should have menu item with external links', () => {
		cy.mount(
			<>
				<IconsProvider />
				<WithDividers />
			</>,
		);
		cy.findByTestId('dropdown.button').click();
		cy.findByTestId('dropdown.menuitem.External link-0')
			.first()
			.should('be.visible')
			.within(() => {
				cy.findByTestId('link.icon.external').should('be.visible');
			});
	});
});
