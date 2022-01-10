import React from 'react';
import tokens from '@talend/design-tokens';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StackHorizontal, StackVertical, StackItem } from './index';

import ButtonPrimary from '../Button/variations/Button.primary';
import Divider from '../Divider/index';
import { manualStackArgs } from './StackHorizontal.stories';
import { alignOptions, overflowOptions, possibleAsTypes } from './StackItem';

export default {
	component: StackVertical,
	subcomponents: { StackHorizontal, StackItem },
} as ComponentMeta<typeof StackVertical>;

function Block({ width }: { width: string }) {
	return (
		<div
			style={{
				width,
				height: tokens.coralSizeL,
				borderRadius: tokens.coralRadiusM,
				background: tokens.coralColorAccentBackground,
				border: `${tokens.coralBorderSDashed} ${tokens.coralColorAccentBorder}`,
			}}
		/>
	);
}

const Template: ComponentStory<typeof StackVertical> = args => (
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

export const StackWithStackItem: ComponentStory<typeof StackItem> = args => {
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
StackWithStackItem.argTypes = {
	grow: { control: { type: 'boolean' }, defaultValue: true },
	shrink: { control: { type: 'boolean' }, defaultValue: false },
	align: {
		options: Object.keys(alignOptions),
		control: { type: 'select' },
		defaultValue: 'center',
	},
	overflow: {
		options: Object.keys(overflowOptions),
		control: { type: 'select' },
		defaultValue: 'auto',
	},
	as: {
		options: [...possibleAsTypes],
		control: { type: 'select' },
		defaultValue: 'li',
	},
};
