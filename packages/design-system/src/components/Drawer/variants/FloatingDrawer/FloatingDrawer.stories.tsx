import React from 'react';
import { ComponentStory, Story } from '@storybook/react';
import { Area } from '~docs';

import { FloatingDrawer } from './FloatingDrawer';
import { ButtonPrimary } from '../../../Button';

export default {
	component: FloatingDrawer,
};

const defaultProps = {
	header: <Area>Heading</Area>,
	children: <Area>Body</Area>,
	footer: <Area>Footer</Area>,
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
