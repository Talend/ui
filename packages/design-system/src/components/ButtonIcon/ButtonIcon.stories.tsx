import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonFloating, ButtonIcon, ButtonToggle } from './index';

export default {
	component: ButtonIcon,
} as ComponentMeta<typeof ButtonIcon>;

const commonArgTypes = {
	children: {
		control: { type: 'text' },
	},
	icon: {
		control: { type: 'text' },
		defaultValue: 'talend-plus',
	},
	isLoading: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
	disabled: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
};

const TemplateIcon: ComponentStory<typeof ButtonIcon> = args => {
	const { children, ...rest } = args;
	return <ButtonIcon {...rest}>{children}</ButtonIcon>;
};

const TemplateToggle: ComponentStory<typeof ButtonToggle> = args => {
	const { children, ...rest } = args;
	return <ButtonToggle {...rest}>{children}</ButtonToggle>;
};

const TemplateFloating: ComponentStory<typeof ButtonFloating> = args => {
	const { children, ...rest } = args;
	return <ButtonFloating {...rest}>{children}</ButtonFloating>;
};

export const Default = TemplateIcon.bind({});
Default.argTypes = {
	...commonArgTypes,
	size: {
		options: ['XS', 'S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
	},
};

export const Toggle = TemplateToggle.bind({});
Toggle.argTypes = {
	...commonArgTypes,
	size: {
		options: ['S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
	},
	isActive: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
};

export const Floating = TemplateFloating.bind({});
Floating.argTypes = {
	...commonArgTypes,
	size: {
		options: ['S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
	},
};

export const NaturalButtonProps: ComponentStory<typeof ButtonFloating> = args => {
	const { children, ...rest } = args;
	return (
		<ButtonFloating {...rest} disabled type="submit">
			{children}
		</ButtonFloating>
	);
};
