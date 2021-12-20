import React from 'react';

import { StackPrimitiveProps } from './Primitive/StackPrimitive';
import { StackHorizontal, StackVertical } from './index';

import ButtonPrimary from '../Button/variations/Button.primary';
import Divider from '../Divider/index';

export default {
	component: StackHorizontal,
};

const TemplateHorizontal = (args: StackPrimitiveProps) => {
	return (
		<StackHorizontal {...args}>
			<>Plick</>
			<>Pluck</>
			<div>Plock</div>
		</StackHorizontal>
	);
};

const TemplateVertical = (args: StackPrimitiveProps) => {
	return (
		<StackVertical {...args} margin={{ x: 'auto', y: 'XL' }}>
			<>Plick</>
			<>Pluck</>
			<div>Plock</div>
		</StackVertical>
	);
};

export const TestHorizontal = TemplateHorizontal.bind({});

export const TestVertical = TemplateVertical.bind({});

export const StackNesting = () => {
	return (
		<StackVertical gap="M" as="article" align="stretch">
			<StackHorizontal gap="S" padding="S" justify="center" align="center">
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<li>List entry 2</li>
					<li>List entry 3</li>
				</StackVertical>
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<li>List entry 2</li>
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
			<StackHorizontal gap="S" padding="S" justify="center" align="center">
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<li>List entry 2</li>
					<li>List entry 3</li>
				</StackVertical>
				<StackVertical gap="XS" as="ul">
					<li>List entry</li>
					<li>List entry 2</li>
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
