import React, { useState } from 'react';
import Fieldset from './Fieldset';
import { ButtonPrimary } from '../../Button';
import ThemeProvider from '../../ThemeProvider';

context('<Fieldset />', () => {
	it('should preserve children component state between renders', () => {
		const TestComponentWithState = () => {
			const [value] = useState(Math.random());
			return <div data-test="random-value-on-mount">{value}</div>;
		};

		const Wrapper = () => {
			const [hasError, setHasError] = useState(false);
			return (
				<ThemeProvider theme={undefined}>
					<Fieldset>
						{hasError ? <span>Error message</span> : null}
						<TestComponentWithState />
					</Fieldset>
					<ButtonPrimary onClick={() => setHasError(!hasError)}>Toggle error</ButtonPrimary>
				</ThemeProvider>
			);
		};

		cy.mount(<Wrapper />);
		cy.get('[data-test="random-value-on-mount"]')
			.invoke('val')
			.then(value => {
				cy.get('button').click();
				cy.get('[data-test="random-value-on-mount"]').should('contain', value);
			});
	});
});
