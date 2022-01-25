import React from 'react';
import { Story } from '@storybook/react';

import Button from '.';
import { ButtonProps } from './Button';
import Skeleton from '../Skeleton';
import Tooltip from '../Tooltip';

export default {
	component: Button,
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
};

export const Primary = {
	render: (props: Story<ButtonProps>) => {
		return <Button.Primary {...props}>Basic Button</Button.Primary>;
	},
};

export const PrimaryIcon = (props: Story<ButtonProps>) => {
	return (
		<Button.Primary icon="talend-plus" {...props}>
			Button with icon
		</Button.Primary>
	);
};
export const PrimarySmall = (props: Story<ButtonProps>) => {
	return (
		<Button.Primary small {...props}>
			Small Button
		</Button.Primary>
	);
};
export const PrimaryDisabled = (props: Story<ButtonProps>) => {
	return (
		<Button.Primary disabled {...props}>
			Disabled Button
		</Button.Primary>
	);
};
export const PrimaryDisabledFocusable = (props: Story<ButtonProps>) => {
	return (
		<Button.Primary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Primary>
	);
};
export const PrimaryAsLink = (props: Story<ButtonProps>) => {
	return (
		<Button.Primary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Primary>
	);
};

export const Destructive = (props: Story<ButtonProps>) => {
	return <Button.Destructive {...props}>Basic Button</Button.Destructive>;
};
export const DestructiveIcon = (props: Story<ButtonProps>) => {
	return (
		<Button.Destructive icon="talend-plus" {...props}>
			Button with icon
		</Button.Destructive>
	);
};
export const DestructiveSmall = (props: Story<ButtonProps>) => {
	return (
		<Button.Destructive small {...props}>
			Small Button
		</Button.Destructive>
	);
};
export const DestructiveDisabled = (props: Story<ButtonProps>) => {
	return (
		<Button.Destructive disabled {...props}>
			Disabled Button
		</Button.Destructive>
	);
};
export const DestructiveDisabledFocusable = (props: Story<ButtonProps>) => {
	return (
		<Button.Destructive disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Destructive>
	);
};
export const DestructiveAsLink = (props: Story<ButtonProps>) => {
	return (
		<Button.Destructive as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Destructive>
	);
};

export const Secondary = (props: Story<ButtonProps>) => {
	return <Button.Secondary {...props}>Basic Button</Button.Secondary>;
};
export const SecondaryIcon = (props: Story<ButtonProps>) => {
	return (
		<Button.Secondary icon="talend-plus" {...props}>
			Button with icon
		</Button.Secondary>
	);
};
export const SecondarySmall = (props: Story<ButtonProps>) => {
	return (
		<Button.Secondary small {...props}>
			Small Button
		</Button.Secondary>
	);
};
export const SecondaryDisabled = (props: Story<ButtonProps>) => {
	return (
		<Button.Secondary disabled {...props}>
			Disabled Button
		</Button.Secondary>
	);
};
export const SecondaryDisabledFocusable = (props: Story<ButtonProps>) => {
	return (
		<Button.Secondary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Secondary>
	);
};
export const SecondaryAsLink = (props: Story<ButtonProps>) => {
	return (
		<Button.Secondary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Secondary>
	);
};

export const Tertiary = (props: Story<ButtonProps>) => {
	return <Button.Tertiary {...props}>Basic Button</Button.Tertiary>;
};
export const TertiaryIcon = (props: Story<ButtonProps>) => {
	return (
		<Button.Tertiary icon="talend-plus" {...props}>
			Button with icon
		</Button.Tertiary>
	);
};
export const TertiarySmall = (props: Story<ButtonProps>) => {
	return (
		<Button.Tertiary small {...props}>
			Small Button
		</Button.Tertiary>
	);
};
export const TertiaryDisabled = (props: Story<ButtonProps>) => {
	return (
		<Button.Tertiary disabled {...props}>
			Disabled Button
		</Button.Tertiary>
	);
};
export const TertiaryDisabledFocusable = (props: Story<ButtonProps>) => {
	return (
		<Button.Tertiary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Tertiary>
	);
};
export const TertiaryAsLink = (props: Story<ButtonProps>) => {
	return (
		<Button.Tertiary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Tertiary>
	);
};

export const SkeletonButton = () => {
	return <Skeleton.Button />;
};
export const SkeletonButtonSmall = () => {
	return <Skeleton.Button />;
};
export const SkeletonButtonIcon = () => {
	return <Skeleton.Icon />;
};

export const TooltipButton = (props: Story<ButtonProps>) => (
	<Tooltip title="Relevant information about contacting the support">
		<Button.Primary icon="talend-bubbles" {...props}>
			Contact support
		</Button.Primary>
	</Tooltip>
);

export const Loading = {
	render: (props: Story<ButtonProps>) => {
		const [loading, isLoading] = React.useState(false);
		return (
			<Tooltip title="Relevant description of the basic button">
				<Button.Primary
					icon="talend-check"
					loading={loading}
					onClick={() => {
						isLoading(true);
						setTimeout(() => isLoading(false), 3000);
					}}
					{...props}
				>
					Async call to action
				</Button.Primary>
			</Tooltip>
		);
	},
};
