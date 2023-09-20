import { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { screen, userEvent } from '@storybook/testing-library';
import { Area } from '../docs/Area';

import { FloatingDrawer, ButtonPrimary } from '../../';

export default {
	component: FloatingDrawer,
	title: 'Navigation/FloatingDrawer',
	argTypes: {
		visible: { control: { type: 'boolean' } },
		header: {
			table: {
				disable: true,
			},
		},
		footer: {
			table: {
				disable: true,
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
		disclosure: {
			table: {
				disable: true,
			},
		},
	},
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
export const Simple: StoryFn<typeof FloatingDrawer> = (props: any) => (
	<FloatingDrawer visible {...props} />
);
Simple.args = defaultProps;

export const WithDisclosure: StoryFn<typeof FloatingDrawer> = () => (
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
	const [visible, setVisible] = useState(false);
	return (
		<>
			<ButtonPrimary data-test="drawer-disclosure" onClick={() => setVisible(!visible)}>
				Open the modal
			</ButtonPrimary>
			<FloatingDrawer {...defaultProps} visible={visible} />
		</>
	);
};
export const WithControlledVisibility: StoryFn<typeof FloatingDrawer> = () => (
	<ControlledFloatingDrawer />
);
WithControlledVisibility.play = playOpenDrawer;

export const Usage: StoryFn<typeof FloatingDrawer> = () => (
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
