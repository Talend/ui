/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from 'react';

import { IconsProvider } from '.';

context('<IconsProvider />', () => {
	beforeEach(() => {
		cy.configureCypressTestingLibrary({ testIdAttribute: 'data-test' });
	});
	it('should render', () => {
		cy.mount(<IconsProvider bundles={[]} />);
		cy.get('svg').should('to.exist').should('have.length', 1);
	});

	it('should prevent multiple instance creation', () => {
		cy.mount(<IconsProvider bundles={[]} />);
		cy.get('svg').should('have.length', 1);
	});
	it('should render default custom icons defined on icons prop', () => {
		const customIcons = {
			custom: <svg />,
		};
		cy.mount(
			<div data-test="wrapper">
				<IconsProvider bundles={[]} icons={customIcons} />
			</div>,
		);
		cy.findByTestId('wrapper')
			.find('symbol')
			.should('have.length', 1)
			.first()
			.should('have.attr', 'id', 'custom');
	});
	it('should support defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		cy.mount(
			<div data-test="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} />
			</div>,
		);
		cy.findByTestId('wrapper')
			.find('symbol')
			.should('have.length', 1)
			.first()
			.should('have.attr', 'id', 'default');
	});
	it('should support defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const customIcons = {
			custom: <svg id="customIcon" />,
		};
		cy.mount(
			<div data-test="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} icons={customIcons} />
			</div>,
		);
		cy.findByTestId('wrapper').find('symbol').should('have.length', 2);
	});
	it('should support additionalBundles props', () => {
		const additionalBundles = ['/some/other/icons', '/more/icons/is/better'];
		cy.intercept('/some/other/icons', '<svg data-test="other-icons"></svg>').as('getOtherBundle');
		cy.intercept('/more/icons/is/better', '<svg data-test="more-icons"></svg>').as('getMoreBundle');
		cy.mount(<IconsProvider bundles={[]} additionalBundles={additionalBundles} />);
		cy.findByTestId('other-icons').should('to.exist');
		cy.findByTestId('more-icons').should('to.exist');
	});
});
