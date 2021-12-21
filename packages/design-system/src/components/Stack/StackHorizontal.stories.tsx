import React from 'react';
import tokens from '@talend/design-tokens';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StackHorizontal } from './index';

export default {
	component: StackHorizontal,
} as ComponentMeta<typeof StackHorizontal>;

function Block({ width }: { width: string }) {
	return (
		<div
			style={{
				width,
				height: tokens.coralSizeL,
				borderRadius: tokens.coralRadiusM,
				background: tokens.coralColorAccentBackground,
				border: `${tokens.coralBorderDashedS} ${tokens.coralColorAccentBorder}`,
			}}
		/>
	);
}

const Template: ComponentStory<typeof StackHorizontal> = args => (
	<StackHorizontal {...args}>
		<Block width="60%" />
		<Block width="40%" />
		<Block width="100%" />
	</StackHorizontal>
);

export const TestHorizontal = Template.bind({});
TestHorizontal.args = {
	gap: 'S',
};
