import React from 'react';

import ButtonPrimitive from './Primitive/ButtonPrimitive';
import { ButtonPrimary, Tooltip } from '../..';

const Loading = ({ 'data-testid': dataTestId }: { 'data-testid': string }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [loading, isLoading] = React.useState(false);
	return (
		<Tooltip title="Relevant description of the basic button">
			<ButtonPrimary
				data-testid={dataTestId}
				icon="talend-check"
				isLoading={loading}
				onClick={() => {
					isLoading(true);
					setTimeout(() => isLoading(false), 3000);
				}}
			>
				Async call to action
			</ButtonPrimary>
		</Tooltip>
	);
};

context('<Button />', () => {
	describe('default', () => {
		it('should be focusable', () => {
			cy.mount(
				<ButtonPrimitive size="M" onClick={() => {}}>
					button
				</ButtonPrimitive>,
			);
			cy.get('button').focus();
		});
		it('should accept data-feature', () => {
			cy.mount(
				<ButtonPrimitive
					size="M"
					data-testid="my.button"
					data-feature="my.feature"
					onClick={() => {}}
				>
					button
				</ButtonPrimitive>,
			);
			// eslint-disable-next-line testing-library/prefer-screen-queries
			cy.getByTestId('my.button').should('have.attr', 'data-feature', 'my.feature');
		});
	});

	describe('loading state', () => {
		it('should load', () => {
			cy.mount(<Loading data-testid="my.button" />);
			// eslint-disable-next-line testing-library/prefer-screen-queries
			cy.getByTestId('my.button')
				.should('have.attr', 'aria-busy', 'false')
				.click()
				.should('have.attr', 'aria-busy', 'true');
			cy.get('button').should('have.attr', 'aria-busy', 'false');
		});

		it('should have a tooltip', () => {
			cy.mount(<Loading data-testid="my.button" />);
			// eslint-disable-next-line testing-library/prefer-screen-queries
			cy.getByTestId('my.button')
				.focus()
				.should('have.attr', 'aria-describedby')
				.then(describedBy =>
					cy.get(`#${describedBy}`).should('have.text', 'Relevant description of the basic button'),
				);
		});
	});
});
