import React from 'react';
import { Story } from '@storybook/react';
import tokens from '@talend/design-tokens';

import { StackPrimitiveProps } from './Primitive/StackPrimitive';
import { StackHorizontal, StackVertical, StackItem } from './index';

import ButtonPrimary from '../Button/variations/Button.primary';
import Divider from '../Divider/index';

export default {
	component: StackHorizontal,
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

export const TestHorizontal = (args: Omit<StackPrimitiveProps, 'direction'>) => {
	return (
		<StackHorizontal {...args}>
			<Block width="60%" />
			<Block width="40%" />
			<Block width="100%" />
		</StackHorizontal>
	);
};
TestHorizontal.args = {
	gap: 'S',
};

export const TestVertical = (args: Omit<StackPrimitiveProps, 'direction'>) => {
	return (
		<StackVertical {...args}>
			<Block width="60%" />
			<Block width="40%" />
			<Block width="100%" />
		</StackVertical>
	);
};
TestVertical.args = {
	gap: 'S',
};

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

export const StackWithStackItem = () => {
	return (
		<StackVertical gap="XS" as="ul" align={'stretch'}>
			<li>
				<Block width="6rem" />
			</li>
			<StackItem align="center" grow shrink={false} as="li">
				<Block width="4rem" />
			</StackItem>
			<li>
				<Block width="8rem" />
			</li>
		</StackVertical>
	);
};
