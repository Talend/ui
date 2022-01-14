import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ButtonIconFloating, ButtonIcon, ButtonToggle } from './index';
import { StackHorizontal } from '../Stack';

export default {
	component: ButtonIcon,
} as ComponentMeta<typeof ButtonIcon>;

const commonArgTypes = {
	children: {
		control: { type: 'text' },
		defaultValue: 'Action label',
	},
	icon: {
		control: { type: 'text' },
		defaultValue: 'talend-plus',
	},
	onClick: {
		disabled: true,
		description: 'A callback function',
		defaultValue: action('Button clicked'),
	},
	isLoading: {
		control: { type: 'boolean' },
		defaultValue: false,
		description: 'optional',
	},
	disabled: {
		control: { type: 'boolean' },
		defaultValue: false,
		description: 'optional',
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

const TemplateFloating: ComponentStory<typeof ButtonIconFloating> = args => {
	const { children, ...rest } = args;
	return <ButtonIconFloating {...rest}>{children}</ButtonIconFloating>;
};

export const Default = TemplateIcon.bind({});
Default.argTypes = {
	...commonArgTypes,
	size: {
		options: ['XS', 'S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
		description: 'optional, defaults to M',
	},
};

export const Toggle = TemplateToggle.bind({});
Toggle.argTypes = {
	...commonArgTypes,
	size: {
		options: ['S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
		description: 'optional, defaults to M',
	},
	isActive: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
};
export const ToggleActive = TemplateToggle.bind({});
ToggleActive.argTypes = {
	...Toggle.argTypes,
};
ToggleActive.args = {
	isActive: true,
};

export const Floating = TemplateFloating.bind({});
Floating.argTypes = {
	...commonArgTypes,
	size: {
		options: ['S', 'M'],
		control: { type: 'select' },
		defaultValue: 'M',
		description: 'optional, defaults to M',
	},
};

export const NaturalButtonProps = () => {
	const [isActive, setActive] = useState<boolean>(false);
	return (
		<StackHorizontal gap="XS">
			<ButtonIcon icon="talend-send" onClick={action('Submitted')} type="submit">
				Send message
			</ButtonIcon>
			<ButtonIconFloating icon="talend-zoomin" onClick={action('Zoomed in')} disabled>
				Zoom in
			</ButtonIconFloating>
			<ButtonToggle
				icon="talend-collapse"
				onClick={() => setActive(!isActive)}
				isActive={isActive}
				data-test={`test-feat-${isActive ? 'on' : 'off'}`}
			>
				Toggle drawer
			</ButtonToggle>
		</StackHorizontal>
	);
};

export const Loading = () => {
	const [isActive, setActive] = useState<boolean>(false);
	return (
		<StackHorizontal gap="XS">
			<ButtonIcon icon="talend-send" onClick={action('Submitted')} type="submit" isLoading>
				Send message
			</ButtonIcon>
			<ButtonIconFloating icon="talend-zoomin" onClick={action('Zoomed in')} isLoading>
				Zoom in
			</ButtonIconFloating>
			<ButtonToggle
				icon="talend-collapse"
				onClick={() => setActive(!isActive)}
				isActive={isActive}
				isLoading
			>
				Toggle drawer
			</ButtonToggle>
			<ButtonToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive isLoading>
				Toggle drawer
			</ButtonToggle>
		</StackHorizontal>
	);
};
