import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonPrimary } from '../Button';
import Modal, { ModalPropsType } from './Modal';

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
					children="(Default story child)"
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

function QuicheRecipe() {
	return (
		<div>
			<p>
				<b>STEP 1</b>
				<br />
				For the pastry, put 175g plain flour, 100g cold butter, cut into pieces, 1 egg yolk and 4
				tsp cold water into a food processor. Using the pulse button, process until the mix binds.
			</p>

			<p>
				<b>STEP 2</b>
				<br />
				Tip the pastry onto a lightly floured surface, gather into a smooth ball, then roll out as
				thinly as you can.
			</p>

			<p>
				<b>STEP 3</b>
				<br />
				Line a 23 x 2.5cm loose-bottomed, fluted flan tin, easing the pastry into the base.
			</p>

			<p>
				<b>STEP 4</b>
				<br />
				Trim the pastry edges with scissors (save any trimmings) so it sits slightly above the tin
				(if it shrinks, it shouldn’t now go below the level of the tin). Press the pastry into the
				flutes, lightly prick the base with a fork, then chill for 10 mins.
			</p>

			<p>
				<b>STEP 5</b>
				<br />
				Put a baking sheet in the oven and heat oven to 200C/fan 180C/gas 6. Line pastry case with
				foil, shiny side down, fill with dry beans and bake on the hot sheet for 15 mins.
			</p>

			<p>
				<b>STEP 6</b>
				<br />
				Remove foil and beans and bake for 4-5 mins more until the pastry is pale golden. If you
				notice any small holes or cracks, patch up with pastry trimmings. You can make up to this
				point a day ahead.
			</p>

			<p>
				<b>STEP 7</b>
				<br />
				While the pastry cooks, prepare the filling. Heat a small frying pan, tip in 200g lardons
				and fry for a couple of mins. Drain off any liquid that comes out, then continue cooking
				until the lardons just start to colour, but aren’t crisp. Remove and drain on paper towels.
			</p>

			<p>
				<b>STEP 8</b>
				<br />
				Cut three quarters of the 50g gruyère into small dice and finely grate the rest. Scatter the
				diced gruyère and fried lardons over the bottom of the pastry case.
			</p>

			<p>
				<b>STEP 9</b>
				<br />
				Using a spoon, beat 200ml crème fraîche to slacken it then slowly beat in 200ml double
				cream. Mix in 3 well beaten eggs. Season (you shouldn’t need much salt) and add a pinch of
				ground nutmeg. Pour three quarters of the filling into the pastry case.
			</p>

			<p>
				<b>STEP 10</b>
				<br />
				Half-pull the oven shelf out and put the flan tin on the baking sheet. Quickly pour the rest
				of the filling into the pastry case – you get it right to the top this way. Scatter the
				grated cheese over the top, then carefully push the shelf back into the oven.
			</p>

			<p>
				<b>STEP 11</b>
				<br />
				Lower the oven to 190C/fan 170C/gas 5. Bake for about 25 mins, or until golden and softly
				set (the centre should not feel too firm).
			</p>

			<p>
				<b>STEP 12</b>
				<br />
				Let the quiche settle for 4-5 mins, then remove from the tin. Serve freshly baked, although
				it’s also good cold.
			</p>

			<div style={{ width: '50%', margin: '2rem auto 0' }}>
				<img
					src="https://img-3.journaldesfemmes.fr/csLNATf47C8IYJxFtQ4S-o1t0kw=/800x600/smart/5a1c637d7ef0426784dad14c29aaff55/recipe-jdf/10025089.jpg"
					alt="The quiche lorraine"
					// width: '50'
				/>
			</div>
		</div>
	);
}

export const NoDisclosure: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'No disclosure modal' }}>
		<p>A basic modal with only a title and a text content.</p>
	</ModalStory>
);

export const WithDisclosure: ComponentStory<typeof Modal> = props => (
	<Modal
		{...props}
		header={{ title: 'With disclosure' }}
		disclosure={
			<ButtonPrimary data-test="modal-disclosure" onClick={() => {}}>
				Open the modal
			</ButtonPrimary>
		}
	>
		<p>A basic modal with an associated disclosure button.</p>
	</Modal>
);

export const WithIcon: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'With icon', icon: 'talend-file-hdfs-o' }}>
		<p>A basic modal with title, a text content and an icon.</p>
	</ModalStory>
);

const customIcon = <span>👋</span>;
export const WithCustomIcon: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'With custom icon', icon: customIcon }}>
		<p>A basic modal with title, a text content and a custom icon.</p>
	</ModalStory>
);

export const WithDescription: ComponentStory<typeof Modal> = props => (
	<ModalStory
		{...props}
		header={{ title: 'With description', description: 'That is the description' }}
	>
		<p>A basic modal with title, a description and a text content.</p>
	</ModalStory>
);

export const WithActions: ComponentStory<typeof Modal> = props => (
	<ModalStory
		{...props}
		header={{ title: 'With actions' }}
		primaryAction={{
			children: 'Primary action',
			onClick: action('[Primary action] onClick'),
		}}
		secondaryAction={{
			children: 'Secondary action',
			onClick: action('[Secondary action] onClick'),
		}}
	>
		<p>
			A modal with title, a text content, an icon and both available actions (primary and
			secondary).
		</p>
	</ModalStory>
);

export const WithDestructivePrimaryAction: ComponentStory<typeof Modal> = props => (
	<ModalStory
		{...props}
		header={{ title: 'With actions' }}
		primaryAction={{
			children: 'Primary action',
			onClick: action('[Primary action] onClick'),
			destructive: true,
		}}
	>
		<p>A modal with a destructive primary action.</p>
	</ModalStory>
);

export const WithNonClosingBackdrop: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'With non closing backdrop' }} preventEscaping>
		<p>
			A modal that doesn't trigger <code>onClose</code> when the backdrop is clicked.
		</p>
	</ModalStory>
);

export const WithOverflowingHeader: ComponentStory<typeof Modal> = props => (
	<ModalStory
		{...props}
		header={{
			title:
				'With overflowing content (including the title and the description, text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
			description:
				'The description is also too long (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
		}}
	>
		👋
	</ModalStory>
);

export const WithOverflowingContent: ComponentStory<typeof Modal> = props => (
	<ModalStory {...props} header={{ title: 'With overflowing content' }}>
		<QuicheRecipe />
	</ModalStory>
);

export const WithEverything: ComponentStory<typeof Modal> = props => (
	<ModalStory
		{...props}
		header={{
			title:
				'With everything, including a long title (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
			description:
				'... and description (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
			icon: 'talend-file-hdfs-o',
		}}
		primaryAction={{
			children: 'Primary action',
			onClick: action('[Primary action] onClick'),
		}}
		secondaryAction={{
			children: 'Secondary action',
			onClick: action('[Secondary action] onClick'),
			'data-feature': 'secondary-action',
		}}
	>
		<QuicheRecipe />
	</ModalStory>
);
