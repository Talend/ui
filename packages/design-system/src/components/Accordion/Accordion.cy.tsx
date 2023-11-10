/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable testing-library/await-async-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import { Accordion, CollapsiblePanel } from './';

const SampleParagraph = () => (
	<p>
		Quisque efficitur, magna sit amet tempor malesuada, orci mauris vestibulum enim, quis gravida
		est urna et ipsum. Nunc rutrum, magna id fermentum dignissim, magna sem volutpat risus, ut
		ultrices ipsum lacus vitae sapien. Curabitur sodales risus ac nibh efficitur, dapibus posuere
		ipsum bibendum. Proin erat ipsum, tempus in aliquet sed, auctor id sem. Maecenas ultrices, magna
		vitae pretium condimentum, ipsum lectus hendrerit est, a ultrices lacus odio in mi. Phasellus
		accumsan diam in metus dictum ultrices. In hac habitasse platea dictumst. Curabitur vestibulum
		vitae libero sit amet blandit. Nulla bibendum sollicitudin dolor at vehicula. Morbi quis viverra
		velit, eget ornare velit. Praesent porttitor sagittis nulla non vehicula. u
	</p>
);
const WithAction = () => (
	<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
		<CollapsiblePanel
			id="panel-with-action"
			title="panel with action"
			action={{
				icon: 'plus',
				tooltip: 'action tooltip',
				callback: () => window.alert('action callback'),
			}}
		>
			<SampleParagraph />
		</CollapsiblePanel>
	</div>
);

context('<CollapsiblePanel />', () => {
	it('should render header', () => {
		cy.mount(<WithAction />);
		cy.findByTestId('panel.header').should('be.visible');
		cy.findByTestId('panel.section').should('not.exist');
	});

	it('should expand and collapse', () => {
		cy.mount(<WithAction />);
		cy.get('#CollapsiblePanel__control--panel-with-action').focus().click();
		cy.findByTestId('panel.section').should('be.visible');
		cy.get('#CollapsiblePanel__control--panel-with-action').focus().click();
		cy.findByTestId('panel.section').should('not.exist');
	});

	it('should hide chevron and action when disabled', () => {
		cy.mount(
			<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
				<CollapsiblePanel
					id="disabled-panel"
					title="disabled panel"
					action={{
						icon: 'plus',
						tooltip: 'action tooltip',
						callback: () => window.alert('action callback'),
					}}
					disabled
				>
					<SampleParagraph />
				</CollapsiblePanel>
			</div>,
		);
		cy.get('#CollapsiblePanel__control--disabled-panel').should('not.exist');
		cy.findByTestId('action.button').should('not.exist');
	});

	it('should display action toolip', () => {
		cy.mount(<WithAction />);
		cy.findByTestId('action.button')
			.focus()
			.should('have.attr', 'aria-describedby')
			.then(describedBy => cy.get(`#${describedBy}`).should('have.text', 'action tooltip'));
	});

	it('should manage expanded state with accordion', () => {
		cy.mount(
			<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
				<Accordion>
					<CollapsiblePanel id="panel-a" title="first panel">
						<SampleParagraph />
					</CollapsiblePanel>
					<CollapsiblePanel id="panel-b" title="second panel">
						<SampleParagraph />
					</CollapsiblePanel>
					<CollapsiblePanel id="panel-c" title="third panel">
						<SampleParagraph />
					</CollapsiblePanel>
				</Accordion>
			</div>,
		);
		cy.get('#CollapsiblePanel__control--panel-a')
			.click()
			.should('have.attr', 'aria-expanded', 'true');
		cy.get('#CollapsiblePanel__control--panel-b')
			.click()
			.should('have.attr', 'aria-expanded', 'true');
		cy.get('#CollapsiblePanel__control--panel-a').should('have.attr', 'aria-expanded', 'false');
	});

	it('should display proper title without status', () => {
		cy.mount(
			<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
				<CollapsiblePanel id="panel-a" title="MyTitle">
					<SampleParagraph />
				</CollapsiblePanel>
			</div>,
		);
		cy.get('#CollapsiblePanel__control--panel-a')
			.find(':nth-child(2)') // Get the second child element
			.then($element => {
				const classname = $element.attr('class');
				expect(classname).to.match(/CollapsiblePanelHeader-module__headerTitle/);
				expect(classname).to.not.match(/Status-module__status/);

				const title = $element.text(); // Get the text content of the element
				expect(title).to.equal('MyTitle');
			});
	});

	it('should display status without title', () => {
		cy.mount(
			<div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem' }}>
				<CollapsiblePanel id="panel-a" status="successful">
					<SampleParagraph />
				</CollapsiblePanel>
			</div>,
		);
		cy.get('#CollapsiblePanel__control--panel-a')
			.find(':nth-child(2)') // Get the second child element
			.then($element => {
				const classname = $element.attr('class');
				expect(classname).to.not.match(/CollapsiblePanelHeader-module__headerTitle/);
				expect(classname).to.match(/Status-module__status/);
			});
	});
});
