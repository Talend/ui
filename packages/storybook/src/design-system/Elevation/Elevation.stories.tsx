import { Story } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

import {
	ButtonIcon,
	ButtonPrimary,
	ButtonTertiary,
	Modal,
	Popover,
	Tooltip,
} from '@talend/design-system';

export default {
	component: Modal,
};

export const ButtonWithPopover = {
	render: (props: Story) => (
		<Popover
			{...props}
			disclosure={
				<ButtonTertiary onClick={() => action('clicked')} data-test="help-action">
					Need help?
				</ButtonTertiary>
			}
		>
			Spell "Patronus!"
		</Popover>
	),
};

export const ButtonWithTooltip = {
	render: (props: Story) => (
		<Tooltip
			title="A summoning spell, Accio! brings objects to you. Great for finding something when it's misplaced"
			placement="top"
			{...props}
		>
			<ButtonPrimary onClick={() => action('clicked')}>Accio!</ButtonPrimary>
		</Tooltip>
	),
};

export const DialogWithTooltipAndPopover = {
	render: (props: Story) => {
		const [modalOpen, setModalOpen] = useState(false);

		return (
			<>
				<ButtonPrimary onClick={() => setModalOpen(true)} data-test="open-modal">
					Open Magic drawer
				</ButtonPrimary>

				{modalOpen && (
					<Modal
						header={{ title: 'Harry Potter' }}
						onClose={() => {
							action('onClose');
							setModalOpen(false);
						}}
						{...props}
					>
						<p style={{ paddingBottom: 20 }}>
							Harry Potter is a series of seven fantasy novels written by British author J. K.
							Rowling.
							<br />
							The novels chronicle the lives of a young wizard, Harry Potter, and his friends
							Hermione Granger
							<br />
							and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and
							Wizardry.
						</p>
						<Tooltip title="From Alohomora to Wingardium Leviosa, have your wands at the ready!">
							<ButtonPrimary onClick={() => action('clicked')}>Need help? Just hover</ButtonPrimary>
						</Tooltip>
						<p style={{ paddingTop: 20, paddingBottom: 20 }}>
							The series was originally published in English by Bloomsbury in the United Kingdom and
							Scholastic Press in the United States. A series of many genres, including fantasy,
							drama, coming-of-age fiction, and the British school story (which includes elements of
							mystery, thriller, adventure, horror, and romance), the world of Harry Potter explores
							numerous themes and includes many cultural meanings and references. According to
							Rowling, the main theme is death. Other major themes in the series include prejudice,
							corruption, and madness.
							<Popover
								disclosure={
									<ButtonIcon icon="talend-question-circle" onClick={() => action('clicked')}>
										Hover and click
									</ButtonIcon>
								}
							>
								Hey I am Popover
							</Popover>
						</p>
					</Modal>
				)}
			</>
		);
	},
};
