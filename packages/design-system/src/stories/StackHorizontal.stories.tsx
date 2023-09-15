import tokens from '@talend/design-tokens';
import { Meta, StoryFn } from '@storybook/react';

import { StackHorizontal } from '../';

import {
	alignContentOptions,
	alignOptions,
	heightOptions,
	justifyOptions,
	possibleAsTypes,
	sizeOptions,
	sizeOptionsWithAuto,
} from '../components/Stack/Primitive/StackPrimitive';

export default {
	component: StackHorizontal,
	title: 'Layout/StackHorizontal',
} as Meta<typeof StackHorizontal>;

// eslint-disable-next-line storybook/prefer-pascal-case
const manualStackArgs = {
	as: { options: [...possibleAsTypes], control: { type: 'select' } },
	justify: {
		options: Object.keys(justifyOptions),
		control: { type: 'select' },
	},
	align: { options: Object.keys(alignOptions), control: { type: 'select' } },
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
	},
	isFullWidth: { control: { type: 'boolean' } },
	height: {
		options: Object.keys(heightOptions),
		control: { type: 'select' },
	},
	alignContent: { options: Object.keys(alignContentOptions), control: { type: 'select' } },
	display: { options: ['block', 'inline'], control: { type: 'select' } },
	role: { control: { type: 'text' } },
};

function Block({ width }: { width: string }) {
	return (
		<div
			style={{
				width,
				height: tokens.coralSizingS,
				borderRadius: tokens.coralRadiusM,
				background: tokens.coralColorAccentBackground,
				border: `${tokens.coralBorderSDashed} ${tokens.coralColorAccentBorder}`,
			}}
		/>
	);
}

const Template: StoryFn<typeof StackHorizontal> = args => (
	<StackHorizontal {...args}>
		<Block width="60%" />
		<Block width="40%" />
		<Block width="100%" />
	</StackHorizontal>
);

export const TestHorizontal = Template.bind({});
TestHorizontal.argTypes = manualStackArgs;
TestHorizontal.args = {
	as: 'div',
	gap: 'S',
	justify: 'start',
	align: 'start',
	wrap: 'nowrap',
	isFullWidth: false,
	height: 'auto',
	alignContent: 'start',
	display: 'block',
	role: '',
};

export const TestHorizontalWithExplicitSpacing = Template.bind({});
TestHorizontalWithExplicitSpacing.args = {
	gap: { x: 'S', y: 'XS' },
	padding: { top: 0, right: 'M', bottom: 'S', left: 'S' },
};
