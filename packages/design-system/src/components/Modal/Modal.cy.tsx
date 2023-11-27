/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable testing-library/await-async-queries */
/* eslint-disable no-console */
/* eslint-disable testing-library/prefer-screen-queries */
import { useState } from 'react';
import { ButtonPrimary } from '../Button';
import { Modal, ModalPropsType } from './Modal';

function ModalStory(props: Partial<ModalPropsType>) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<ButtonPrimary onClick={() => setModalOpen(true)} data-testid="open-modal">
				See
			</ButtonPrimary>

			{modalOpen && (
				<Modal
					header={{ title: '(Default story title)' }}
					// eslint-disable-next-line react/no-children-prop
					children="(Default story child)"
					onClose={() => {
						console.log('onClose');
						setModalOpen(false);
					}}
					{...props}
				/>
			)}
		</>
	);
}
context('<Modal />', () => {
	it('should render and focus on the modal', () => {
		cy.mount(<ModalStory header={{ title: 'No disclosure modal' }} />);
		cy.findByTestId('open-modal').click();
		cy.findByTestId('modal').should('be.visible');
		cy.focused().should('have.attr', 'data-testid', 'modal');
	});

	it('should support custom disclosure', () => {
		cy.mount(
			<Modal
				header={{ title: 'With disclosure' }}
				disclosure={
					<ButtonPrimary data-testid="modal-disclosure" onClick={() => {}}>
						Open the modal
					</ButtonPrimary>
				}
			>
				<p>A basic modal with an associated disclosure button.</p>
			</Modal>,
		);
		cy.findByTestId('modal-disclosure').click();
		cy.findByTestId('modal').should('be.visible');
	});

	it('should close the modal on cancel/close action', () => {
		// when
		cy.mount(
			<ModalStory header={{ title: 'No disclosure modal' }}>
				<p>A basic modal with only a title and a text content.</p>
			</ModalStory>,
		);
		cy.findByTestId('open-modal').click();
		cy.findByTestId('modal.buttons.close').click();
		cy.findByTestId('modal').should('not.exist');
	});

	it('should not have cancel/close action when preventEscaping is passed', () => {
		// when
		cy.mount(
			<ModalStory header={{ title: 'No disclosure modal' }} preventEscaping>
				<p>A basic modal with only a title and a text content.</p>
			</ModalStory>,
		);
		cy.findByTestId('open-modal').click();
		cy.findByTestId('modal.buttons.close').should('not.exist');
	});

	it('should close the modal on ESC key', () => {
		// when
		cy.mount(
			<ModalStory header={{ title: 'No disclosure modal' }}>
				<p>A basic modal with only a title and a text content.</p>
			</ModalStory>,
		);
		cy.findByTestId('open-modal').click();
		cy.findByTestId('modal').type('{esc}');
		cy.findByTestId('modal').should('not.exist');
	});

	it('should not close the modal on ESC key', () => {
		// when
		cy.mount(
			<ModalStory header={{ title: 'With non closing backdrop' }} preventEscaping>
				<p>
					A modal that doesn't trigger <code>onClose</code> when the backdrop is clicked.
				</p>
			</ModalStory>,
		);
		cy.findByTestId('open-modal').click();
		cy.findByTestId('modal').type('{esc}');
		cy.findByTestId('modal').should('exist');
	});
});
