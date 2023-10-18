import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	ButtonIcon,
	ButtonIconFloating,
	ButtonIconToggle,
	Skeleton,
	StackHorizontal,
	StackVertical,
} from '../../';

const defaultArgs = {
	children: 'Action label',
	icon: 'plus',
	action: action('Button clicked'),
	size: 'M',
};

const commonArgTypes = {
	children: {
		control: { type: 'text' },
	},
	icon: {
		control: { type: 'text' },
		description:
			'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.',
	},
	size: {
		options: ['XS', 'S', 'M'],
		control: { type: 'select' },
		description: 'optional, defaults to M',
	},
	onClick: {
		disabled: true,
		description: 'A callback function',
	},
	isLoading: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	disabled: {
		control: { type: 'boolean' },
		description: 'optional',
	},
};

export default {
	component: ButtonIcon,
	title: 'Clickable/ButtonIcon',
	args: defaultArgs,
	argTypes: commonArgTypes,
} as Meta<typeof ButtonIcon>;

const TemplateIcon: StoryFn<typeof ButtonIcon> = args => {
	const { children, ...rest } = args;
	return <ButtonIcon {...rest}>{children}</ButtonIcon>;
};

const TemplateToggle: StoryFn<typeof ButtonIconToggle> = args => {
	const { children, ...rest } = args;
	return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;
};

const TemplateFloating: StoryFn<typeof ButtonIconFloating> = args => {
	const { children, ...rest } = args;
	return <ButtonIconFloating {...rest}>{children}</ButtonIconFloating>;
};

export const Default = TemplateIcon.bind({});
Default.args = defaultArgs;
Default.argTypes = {
	...commonArgTypes,
};

export const Toggle = TemplateToggle.bind({});
Toggle.args = defaultArgs;
Toggle.argTypes = {
	...commonArgTypes,
	isActive: {
		control: { type: 'boolean' },
	},
};
export const ToggleActive = TemplateToggle.bind({});

ToggleActive.argTypes = {
	...Toggle.argTypes,
};
ToggleActive.args = {
	...defaultArgs,
	isActive: true,
};

export const Floating = TemplateFloating.bind({});
Floating.args = defaultArgs;
Floating.argTypes = {
	...commonArgTypes,
	size: {
		options: ['S', 'M'],
		control: { type: 'select' },
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
			<ButtonIconToggle
				icon="talend-collapse"
				onClick={() => setActive(!isActive)}
				isActive={isActive}
				data-test={`test-feat-${isActive ? 'on' : 'off'}`}
			>
				Toggle drawer
			</ButtonIconToggle>
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
			<ButtonIconToggle
				icon="talend-collapse"
				onClick={() => setActive(!isActive)}
				isActive={isActive}
				isLoading
			>
				Toggle drawer
			</ButtonIconToggle>
			<ButtonIconToggle
				icon="talend-collapse"
				onClick={() => setActive(!isActive)}
				isActive
				isLoading
			>
				Toggle drawer
			</ButtonIconToggle>
		</StackHorizontal>
	);
};

export const Variations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="spaceAround" align="center">
			<p>&nbsp;</p>
			<h3>M</h3>
			<h3>S</h3>
			<h3>XS</h3>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Default</h3>
			<ButtonIcon icon="plus" onClick={action('Clicked')}>
				Size M
			</ButtonIcon>
			<ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
				Size S
			</ButtonIcon>
			<ButtonIcon size="XS" icon="plus" onClick={action('Clicked')}>
				Size XS
			</ButtonIcon>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Floating</h3>
			<ButtonIconFloating icon="plus" onClick={action('Clicked')}>
				Size M
			</ButtonIconFloating>
			<ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
				Size S
			</ButtonIconFloating>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Toggle-ON</h3>
			<ButtonIconToggle isActive icon="plus" onClick={action('Clicked')}>
				Size M + Active
			</ButtonIconToggle>
			<ButtonIconToggle isActive icon="plus" onClick={action('Clicked')} size="S">
				Size S + Active
			</ButtonIconToggle>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Toggle-OFF</h3>
			<ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')}>
				Size M + Inactive
			</ButtonIconToggle>
			<ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')} size="S">
				Size S + Inactive
			</ButtonIconToggle>
		</StackVertical>
	</StackHorizontal>
);

export const DefaultButtonIcon = () => (
	<StackHorizontal gap="XS" justify="center" align="center">
		<ButtonIcon icon="plus" onClick={action('Clicked')}>
			Size M
		</ButtonIcon>
		<ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
			Size S
		</ButtonIcon>
		<ButtonIcon icon="plus" onClick={action('Clicked')} size="XS">
			Size XS
		</ButtonIcon>
	</StackHorizontal>
);

export const DefaultButtonIconToggle = () => (
	<StackHorizontal gap="XS" justify="center" align="center">
		<ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')}>
			Size M + Inactive
		</ButtonIconToggle>
		<ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')} size="S">
			Size S + Inactive
		</ButtonIconToggle>

		<ButtonIconToggle isActive icon="plus" onClick={action('Clicked')}>
			Size M + Active
		</ButtonIconToggle>
		<ButtonIconToggle isActive icon="plus" onClick={action('Clicked')} size="S">
			Size S + Active
		</ButtonIconToggle>
	</StackHorizontal>
);

export const DefaultButtonIconFloating = () => (
	<StackHorizontal gap="XS" justify="center" align="center">
		<ButtonIconFloating icon="plus" onClick={action('Clicked')}>
			Size M
		</ButtonIconFloating>
		<ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
			Size S
		</ButtonIconFloating>
	</StackHorizontal>
);

export const ButtonIconSkeletons = () => (
	<StackHorizontal gap="XS" align="center">
		<Skeleton variant="buttonIcon" />
		<Skeleton variant="buttonIcon" size="S" />
		<Skeleton variant="buttonIcon" size="XS" />
	</StackHorizontal>
);
