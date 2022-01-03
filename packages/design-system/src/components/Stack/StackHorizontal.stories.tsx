import React from 'react';
import tokens from '@talend/design-tokens';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StackHorizontal } from './index';
import {
	alignContentOptions,
	alignOptions,
	justifyOptions,
	possibleAsTypes,
	sizeOptions,
	sizeOptionsWithAuto,
} from './Primitive/StackPrimitive';

export default {
	component: StackHorizontal,
} as ComponentMeta<typeof StackHorizontal>;

export const manualStackArgs = {
	as: { options: [...possibleAsTypes], control: { type: 'select' }, defaultValue: 'div' },
	justify: {
		options: Object.keys(justifyOptions),
		control: { type: 'select' },
		defaultValue: 'start',
	},
	align: { options: Object.keys(alignOptions), control: { type: 'select' }, defaultValue: 'start' },
	gap: {
		options: Object.keys(sizeOptions),
		control: { type: 'select' },
		description: 'MANDATORY. Can also be set as an object `{ x: SizeToken, y: SizeToken }`',
	},
	padding: {
		options: Object.keys(sizeOptions),
		control: { type: 'select' },
		description:
			'Can also be set as an object `{ x: SizeToken, y: SizeToken }` or `{top: SizeToken, left: SizeToken, right: SizeToken, bottom: SizeToken}`',
	},
	margin: {
		options: Object.keys(sizeOptionsWithAuto),
		control: { type: 'select' },
		description:
			'Can also be set as an object `{ x: SizeToken, y: SizeToken }` or `{top: SizeToken, left: SizeToken, right: SizeToken, bottom: SizeToken}`',
	},
	wrap: {
		options: ['nowrap', 'wrap', 'wrapReverse'],
		control: { type: 'select' },
		defaultValue: 'nowrap',
	},
	alignContent: { options: Object.keys(alignContentOptions), control: { type: 'select' } },
	display: { options: ['block', 'inline'], control: { type: 'select' }, defaultValue: 'block' },
	role: { control: { type: 'text' } },
};

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
TestHorizontal.argTypes = manualStackArgs;
TestHorizontal.args = { gap: 'S' };

export const TestHorizontalWithExplicitSpacing = Template.bind({});
TestHorizontalWithExplicitSpacing.args = {
	gap: { x: 'S', y: 'XS' },
	padding: { top: 0, right: 'M', bottom: 'S', left: 'S' },
};
