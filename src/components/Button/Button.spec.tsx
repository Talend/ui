/// <reference types="cypress" />

import React from 'react';

import { ButtonProps } from './Button';
import Button from './';
import Tooltip from '../Tooltip';

export const LoadingButton = (props: ButtonProps) => {
	const [loading, isLoading] = React.useState(false);
	return (
		<Tooltip title="Relevant description of the basic button">
			<Button.Primary
				icon="talend-check"
				loading={loading}
				onClick={() => {
					isLoading(true);
					setTimeout(() => isLoading(false), 3000);
				}}
				{...props}
			>
				Async call to action
			</Button.Primary>
		</Tooltip>
	);
};

context('<Button />', () => {
	describe('default state', () => {
		it('should be focusable', () => {
			cy.mount(<Button />);
			cy.get('.btn').focus();
		});
	});

	describe('loading state', () => {
		it('should load', () => {
			cy.mount(<LoadingButton />);
			cy.get('.btn')
				.should('have.attr', 'aria-busy', 'false')
				.click()
				.should('have.attr', 'aria-busy', 'true');
			cy.get('.btn')
				.should('have.attr', 'aria-busy', 'false');
		});

		it('should have a tooltip', () => {
			cy.mount(
				<Tooltip title="Relevant description of the basic button">
					<Button>Async</Button>
				</Tooltip>,
			);
			cy.get('.btn')
				.focus()
				.should('have.attr', 'aria-describedby')
				.then(describedBy =>
					cy.get(`#${describedBy}`).should('have.text', 'Relevant description of the basic button'),
				);
		});
	});
});
