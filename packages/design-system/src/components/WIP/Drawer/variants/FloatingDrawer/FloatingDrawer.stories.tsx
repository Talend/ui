import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Area } from '~docs';
import { screen, userEvent } from '@storybook/testing-library';

import { FloatingDrawer } from './FloatingDrawer';
import { ButtonPrimary } from '../../../../Button';

export default {
	component: FloatingDrawer,
};

const defaultProps = {
	header: <Area>Heading</Area>,
	children: <Area>Body</Area>,
	footer: <Area>Footer</Area>,
};

const playOpenDrawer = async () => {
	const openButton = screen.getByRole('button');
	await userEvent.click(openButton);
};

export const Simple: ComponentStory<typeof FloatingDrawer> = () => (
	<FloatingDrawer {...defaultProps} visible />
);

export const WithDisclosure: ComponentStory<typeof FloatingDrawer> = () => (
	<FloatingDrawer
		{...defaultProps}
		disclosure={
			<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
				Open the modal
			</ButtonPrimary>
		}
	/>
);
WithDisclosure.play = playOpenDrawer;

const ControlledFloatingDrawer = () => {
	const [visible, setVisible] = React.useState(false);
	return (
		<>
			<ButtonPrimary data-test="drawer-disclosure" onClick={() => setVisible(!visible)}>
				Open the modal
			</ButtonPrimary>
			<FloatingDrawer {...defaultProps} visible={visible} />
		</>
	);
};
export const WithControlledVisibility: ComponentStory<typeof FloatingDrawer> = () => (
	<ControlledFloatingDrawer />
);
WithControlledVisibility.play = playOpenDrawer;

export const Usage: ComponentStory<typeof FloatingDrawer> = () => (
	<FloatingDrawer
		header={<Area>Heading</Area>}
		footer={<Area>Footer</Area>}
		disclosure={
			<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
				Open the modal
			</ButtonPrimary>
		}
	>
		<Area>Body</Area>
	</FloatingDrawer>
);
Usage.play = playOpenDrawer;
