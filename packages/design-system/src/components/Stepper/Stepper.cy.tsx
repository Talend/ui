/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import Stepper from '.';

context('<Stepper />', () => {
	it('should render first step as current step', () => {
		cy.mount(
			<Stepper currentStepIndex={0}>
				<Stepper.Step.InProgress title="Current step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
			</Stepper>,
		);
		cy.get('ol li').first().should('have.attr', 'aria-current', 'step');
	});

	it('should have last step as current step', () => {
		cy.mount(
			<Stepper currentStepIndex={3}>
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.InProgress title="Current step" />
			</Stepper>,
		);
		cy.get('ol li').last().should('have.attr', 'aria-current', 'step');
	});

	it('should render progressbar with no height', () => {
		cy.mount(
			<Stepper currentStepIndex={0}>
				<Stepper.Step.InProgress title="Current step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
			</Stepper>,
		);
		cy.get("[role='progressbar'] div").first().should('have.attr', 'style', 'height: 0%;');
	});

	it('should render progressbar with 100% height', () => {
		cy.mount(
			<Stepper currentStepIndex={2}>
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.InProgress title="Current step" />
			</Stepper>,
		);
		cy.get("[role='progressbar'] div").last().should('have.attr', 'style', 'height: 100%;');
	});

	it('should render progressbar with no height if the currentStepIndex is outside of the range of steps', () => {
		cy.mount(
			<Stepper currentStepIndex={5}>
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.InProgress title="Current step" />
			</Stepper>,
		);
		cy.get("[role='progressbar'] div").last().should('have.attr', 'style', 'height: 0%;');
	});

	it('should render progressbar with no height if the currentStepIndex is outside of the range of steps', () => {
		cy.mount(
			<Stepper currentStepIndex={'3' as any}>
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.Enabled title="Next step" />
				<Stepper.Step.InProgress title="Current step" />
			</Stepper>,
		);
		cy.get("[role='progressbar'] div").last().should('have.attr', 'style', 'height: 0%;');
	});
});
