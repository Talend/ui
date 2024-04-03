/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ButtonPrimary } from '../Button';
import { Modal, ModalPropsType } from './';

function ModalComponentTester(props: Partial<ModalPropsType>) {
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
						setModalOpen(false);
					}}
					{...props}
				/>
			)}
		</>
	);
}

describe('Message', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Modal visible header={{ title: '(Default story title)' }} onClose={() => jest.fn()}>
					Content
				</Modal>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});

	it('should close the modal on backdrop click', async () => {
		const user = userEvent.setup();

		render(<ModalComponentTester />);

		const openModalBtn = screen.getByTestId('open-modal');
		expect(openModalBtn).toBeInTheDocument();
		user.click(openModalBtn);

		const modalBackdrop = await screen.findByTestId('open-modal');
		expect(modalBackdrop).toBeInTheDocument();
		user.click(modalBackdrop);

		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('should not close the modal on backdrop click', async () => {
		const user = userEvent.setup();

		render(<ModalComponentTester preventInteractiveBackdrop />);

		const openModalBtn = screen.getByTestId('open-modal');
		expect(openModalBtn).toBeInTheDocument();
		user.click(openModalBtn);

		const modalBackdrop = await screen.findByTestId('open-modal');
		expect(modalBackdrop).toBeInTheDocument();
		user.click(modalBackdrop);

		expect(await screen.findByTestId('modal')).toBeInTheDocument();
	});
});
