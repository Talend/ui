import React from 'react';
import { Story } from '@storybook/react';

import { StackPrimitiveProps } from './Primitive/StackPrimitive';
import { StackHorizontal, StackVertical } from './index';

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

export const TestHorizontal: Story<StackPrimitiveProps> = TemplateHorizontal.bind({});

export const TestVertical: Story<StackPrimitiveProps> = TemplateVertical.bind({});
