import React from 'react';

import { IconsProvider } from '.';

context('<IconsProvider />', () => {
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
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} icons={customIcons} />
			</div>,
		);
		cy.getByTestId('wrapper')
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
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} />
			</div>,
		);
		cy.getByTestId('wrapper')
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
			<div data-testid="wrapper">
				<IconsProvider bundles={[]} defaultIcons={defaultIcons} icons={customIcons} />
			</div>,
		);
		cy.getByTestId('wrapper').find('symbol').should('have.length', 2);
	});
});
