/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
import { useState } from 'react';
import Fieldset from './Fieldset';
import { ButtonPrimary } from '../../Button';

context('<Fieldset />', () => {
	it('should preserve children component state between renders', () => {
		const TestComponentWithState = () => {
			const [value] = useState(Math.random());
			return <div data-testid="random-value-on-mount">{value}</div>;
		};

		const Wrapper = () => {
			const [hasError, setHasError] = useState(false);
			return (
				<>
					<Fieldset>
						{hasError ? <span>Error message</span> : null}
						<TestComponentWithState />
					</Fieldset>
					<ButtonPrimary onClick={() => setHasError(!hasError)}>Toggle error</ButtonPrimary>
				</>
			);
		};

		cy.mount(<Wrapper />);
		cy.findByTestId('random-value-on-mount')
			.invoke('val')
			.then(value => {
				cy.get('button').click();
				cy.findByTestId('random-value-on-mount').should('contain', value);
			});
	});
});
