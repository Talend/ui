import React from 'react';
import { composeStories } from '@storybook/testing-react';

import * as Stories from './Accordion.stories';

const { WithAction, AccordionWrapper, DisabledPanel } = composeStories(Stories);

context('<CollapsiblePanel />', () => {
	it('should render header', () => {
		cy.mount(<WithAction />);
		cy.getByTest('panel.header').should('be.visible');
		cy.getByTest('panel.section').should('not.exist');
	});

	it('should expand and collapse', () => {
		cy.mount(<WithAction />);
		cy.get('#actionCollapsible_control').click();
		cy.getByTest('panel.section').should('be.visible');
		cy.get('#actionCollapsible_control').click();
		cy.getByTest('panel.section').should('not.exist');
	});

	it('should hide chevron and action when disabled', () => {
		cy.mount(<DisabledPanel />);
		cy.get('#actionCollapsible_control').should('not.exist');
		cy.get('#actionCollapsible_control').should('not.exist');
	});

	it('should display action toolip', () => {
		cy.mount(<WithAction />);
		cy.getByTest('action.button')
			.focus()
			.should('have.attr', 'aria-describedby')
			.then(describedBy => cy.get(`#${describedBy}`).should('have.text', 'action tooltip'));
	});

	it('should manage expanded state with accordion', () => {
		cy.mount(<AccordionWrapper />);
		cy.get('#SimpleAccordion-p1_control').click().should('have.attr', 'aria-expanded', 'true');
		cy.get('#SimpleAccordion-p2_control').click().should('have.attr', 'aria-expanded', 'true');
		cy.get('#SimpleAccordion-p1_control').should('have.attr', 'aria-expanded', 'false');
	});
});
