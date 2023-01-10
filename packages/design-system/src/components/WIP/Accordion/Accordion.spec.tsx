import React from 'react';
import { Accordion, CollapsiblePanel } from '../../..';

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
		cy.getByTest('panel.header').should('be.visible');
		cy.getByTest('panel.section').should('not.exist');
	});

	it('should expand and collapse', () => {
		cy.mount(<WithAction />);
		cy.get('#CollapsiblePanel__control--panel-with-action').click();
		cy.getByTest('panel.section').should('be.visible');
		cy.get('#CollapsiblePanel__control--panel-with-action').click();
		cy.getByTest('panel.section').should('not.exist');
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
		cy.getByTest('action.button').should('not.exist');
	});

	it('should display action toolip', () => {
		cy.mount(<WithAction />);
		cy.getByTest('action.button')
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
});
