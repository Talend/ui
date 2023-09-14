import { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { Area } from './docs/Area';
import { screen, userEvent } from '@storybook/testing-library';

import { FloatingDrawer, ButtonPrimary } from '../';

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
const containerStyle = {
	...FloatingDrawer.containerStyle,
	// body of the preview has a padding of 1rem
	width: 'calc(100vw - 2rem)',
	height: 'calc(100vh - 2rem)',
};

export const Simple: ComponentStory<typeof FloatingDrawer> = (props: any) => (
	<div style={containerStyle}>
		<FloatingDrawer visible {...props} />
	</div>
);
Simple.args = defaultProps;

export const WithDisclosure: ComponentStory<typeof FloatingDrawer> = () => (
	<div style={containerStyle}>
		<FloatingDrawer
			{...defaultProps}
			disclosure={
				<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
					Open the modal
				</ButtonPrimary>
			}
		/>
	</div>
);
// WithDisclosure.play = playOpenDrawer;

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
