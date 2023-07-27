import { Story, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Popover, ButtonIcon, ButtonPrimary, Modal } from '@talend/design-system';
import { ModalPropsType } from '@talend/design-system/lib/components/Modal';

export default {
	component: Modal,
};

function ModalStory(props: Partial<ModalPropsType>) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<ButtonPrimary onClick={() => setModalOpen(true)} data-test="open-modal">
				See
			</ButtonPrimary>

			{modalOpen && (
				<Modal
					header={{ title: '(Default story title)' }}
					onClose={() => {
						action('onClose');
						setModalOpen(false);
					}}
					{...props}
				/>
			)}
		</>
	);
}

export const DialogWithTooltipAndPopover: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'Dialog with Tooltip and Popover' }}>
		<Popover
			isFixed
			disclosure={
				<ButtonIcon size="M" icon="pencil" onClick={() => action('click')}>
					Hey I am tooltip. Click to see the Popover
				</ButtonIcon>
			}
		>
			Hey I am Popover
		</Popover>
		Default story child
	</ModalStory>
);
