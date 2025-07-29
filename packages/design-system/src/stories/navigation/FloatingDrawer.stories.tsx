import { useState } from 'react';

import { StoryFn } from '@storybook/react';
import { screen, userEvent } from '@storybook/testing-library';

import { ButtonPrimary, FloatingDrawer, FloatingDrawerProps, InlineEditing } from '../../';
import { Area } from '../docs/Area';

export default {
	component: FloatingDrawer,
	title: 'Navigation/FloatingDrawer',
	argTypes: {
		['aria-label']: { control: { type: 'text' } },
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
	decorators: [
		(Story: any) => (
			<div
				style={{
					position: 'relative',
					height: '500px',
					overflow: 'hidden',
				}}
			>
				<Story />
			</div>
		),
	],
};

const defaultProps = {
	['aria-label']: 'simple label for a11y',
	header: <Area>Heading</Area>,
	children: <Area>Body</Area>,
	footer: <Area>Footer</Area>,
};

const overflowProps = {
	header: (
		<InlineEditing.Text
			defaultValue="Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
			placeholder="Type something..."
			label="Iniline edit that overflows"
		/>
	),
	children: (
		<InlineEditing.Textarea
			defaultValue="Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
			placeholder="Type something..."
			label="Iniline edit that overflows"
		/>
	),
};

const playOpenDrawer = async () => {
	const openButton = screen.getByRole('button');
	await userEvent.click(openButton);
};
const containerStyle = {
	// body of the preview has a padding of 0.625rem
	width: 'calc(100vw - 1.25rem)',
	height: 'calc(100vh - 1.25rem)',
};

export const Simple: StoryFn<typeof FloatingDrawer> = (
	//	props: Omit<FloatingDrawerProps, 'visible' | 'aria-label'>,
	{ disclosure, visible, ...props }: FloatingDrawerProps,
) => (
	<FloatingDrawer.Container style={containerStyle}>
		<FloatingDrawer {...props} visible />
	</FloatingDrawer.Container>
);
Simple.args = defaultProps;

export const Overflow: StoryFn<typeof FloatingDrawer> = ({
	disclosure,
	visible,
	...props
}: FloatingDrawerProps) => (
	<FloatingDrawer.Container style={containerStyle}>
		<FloatingDrawer {...props} visible />
	</FloatingDrawer.Container>
);
Overflow.args = overflowProps;

export const WithDisclosure: StoryFn<typeof FloatingDrawer> = () => (
	<FloatingDrawer.Container style={containerStyle}>
		<FloatingDrawer
			{...defaultProps}
			disclosure={
				<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
					Open the modal
				</ButtonPrimary>
			}
		/>
	</FloatingDrawer.Container>
);

// WithDisclosure.play = playOpenDrawer;

const ControlledFloatingDrawer = () => {
	const [visible, setVisible] = useState(false);
	return (
		<FloatingDrawer.Container>
			<ButtonPrimary data-test="drawer-disclosure" onClick={() => setVisible(!visible)}>
				Open the modal
			</ButtonPrimary>
			<FloatingDrawer {...defaultProps} visible={visible} />
		</FloatingDrawer.Container>
	);
};
export const WithControlledVisibility: StoryFn<typeof FloatingDrawer> = () => (
	<ControlledFloatingDrawer />
);
WithControlledVisibility.play = playOpenDrawer;

export const Usage: StoryFn<typeof FloatingDrawer> = () => (
	<FloatingDrawer.Container>
		<FloatingDrawer
			aria-label="usage example"
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
	</FloatingDrawer.Container>
);

Usage.play = playOpenDrawer;
