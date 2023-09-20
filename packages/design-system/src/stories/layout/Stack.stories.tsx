import tokens from '@talend/design-tokens';
import { StoryObj, StoryFn } from '@storybook/react';

import { StackHorizontal, StackVertical, StackItem, Divider, ButtonPrimary } from '../../';

import {
	alignContentOptions,
	alignOptions,
	heightOptions,
	justifyOptions,
	possibleAsTypes,
	sizeOptions,
	sizeOptionsWithAuto,
} from '../../components/Stack/Primitive/StackPrimitive';

import { overflowOptions } from '../../components/Stack/StackItem';

export default {
	component: StackHorizontal,
	title: 'Layout/Stack',
	subcomponents: { StackVertical, StackItem },
} as StoryObj<typeof StackHorizontal>;

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
	alignContent: { options: Object.keys(alignContentOptions), control: { type: 'select' } },
	display: { options: ['block', 'inline'], control: { type: 'select' } },
	role: { control: { type: 'text' } },
};

const verticalArgTypes = {
	...manualStackArgs,
	height: {
		options: Object.keys(heightOptions),
		control: { type: 'select' },
	},
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
	alignContent: 'start',
	display: 'block',
	role: '',
};

export const TestHorizontalWithExplicitSpacing = Template.bind({});
TestHorizontalWithExplicitSpacing.argTypes = manualStackArgs;
TestHorizontalWithExplicitSpacing.args = {
	gap: { x: 'S', y: 'XS' },
	padding: { top: 0, right: 'M', bottom: 'S', left: 'S' },
};

const TemplateVertical: StoryFn<typeof StackVertical> = args => (
	<StackVertical {...args}>
		<Block width="60%" />
		<Block width="40%" />
		<Block width="100%" />
	</StackVertical>
);

export const TestVertical = TemplateVertical.bind({});
TestVertical.argTypes = verticalArgTypes;
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
