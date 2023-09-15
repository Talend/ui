import tokens from '@talend/design-tokens';
import { StoryFn, StoryObj } from '@storybook/react';

import { ButtonPrimary, Divider, StackHorizontal, StackVertical, StackItem } from '../';

import {
	alignOptions,
	possibleAsTypes,
	justifyOptions,
	sizeOptionsWithAuto,
	heightOptions,
	alignContentOptions,
	sizeOptions,
} from '../components/Stack/Primitive/StackPrimitive';

import { overflowOptions } from '../components/Stack/StackItem';

export default {
	component: StackVertical,
	title: 'Layout/StackVertical',
	subcomponents: { StackHorizontal, StackItem },
} as StoryObj<typeof StackVertical>;

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

const Template: StoryFn<typeof StackVertical> = args => (
	<StackVertical {...args}>
		<Block width="60%" />
		<Block width="40%" />
		<Block width="100%" />
	</StackVertical>
);

export const TestVertical = Template.bind({});
TestVertical.argTypes = manualStackArgs;
TestVertical.args = { gap: 'S' };

export const StackNesting = () => {
	return (
		<StackVertical gap="M" as="article" align="stretch">
			<StackHorizontal gap="S" padding="S" justify="center" align="center">
				<StackItem align="end" grow>
					<StackVertical gap="XS" as="ul">
						<li>List entry</li>
						<li>List entry 2</li>
						<li>List entry 3</li>
					</StackVertical>
				</StackItem>
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<StackItem align="center" grow as="li">
						List entry 2
					</StackItem>
					<li>List entry 3</li>
				</StackVertical>
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<li>List entry 2</li>
					<li>List entry 3</li>
					<li>List entry 4</li>
				</StackVertical>
			</StackHorizontal>
			<Divider />
			<StackHorizontal gap="XS" justify="center" align="center">
				<p>Lorem ipsum dolor sit amet.</p>
				<ButtonPrimary onClick={() => {}}>Click here</ButtonPrimary>
			</StackHorizontal>
		</StackVertical>
	);
};

export const StackWithStackItem: StoryFn<typeof StackItem> = args => {
	return (
		<StackVertical gap="XS" as="ul" align="stretch">
			<li>
				<Block width="6rem" />
			</li>
			<StackItem {...args}>
				<Block width="4rem" />
			</StackItem>
			<li>
				<Block width="8rem" />
			</li>
		</StackVertical>
	);
};
StackWithStackItem.args = {
	grow: true,
	shrink: false,
	align: 'center',
	overflow: 'auto',
	as: 'li',
};

StackWithStackItem.argTypes = {
	grow: { control: { type: 'boolean' } },
	shrink: { control: { type: 'boolean' } },
	align: {
		options: Object.keys(alignOptions),
		control: { type: 'select' },
	},
	overflow: {
		options: Object.keys(overflowOptions),
		control: { type: 'select' },
	},
	as: {
		options: [...possibleAsTypes],
		control: { type: 'select' },
	},
};
