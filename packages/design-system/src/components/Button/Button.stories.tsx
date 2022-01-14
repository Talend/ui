import React from 'react';
import { Story } from '@storybook/react';

import Button from '.';
import Skeleton from '../Skeleton';
import Tooltip from '../Tooltip';

export default {
	component: Button,
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
};

export const Primary = (props: Story) => {
	return <Button.Primary {...props}>Basic Button</Button.Primary>;
};

export const PrimaryIcon = (props: Story) => {
	return (
		<Button.Primary icon="talend-plus" {...props}>
			Button with icon
		</Button.Primary>
	);
};
export const PrimarySmall = (props: Story) => {
	return (
		<Button.Primary small {...props}>
			Small Button
		</Button.Primary>
	);
};
export const PrimaryDisabled = (props: Story) => {
	return (
		<Button.Primary disabled {...props}>
			Disabled Button
		</Button.Primary>
	);
};
export const PrimaryDisabledFocusable = (props: Story) => {
	return (
		<Button.Primary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Primary>
	);
};
export const PrimaryAsLink = (props: Story) => {
	return (
		<Button.Primary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Primary>
	);
};

export const Destructive = (props: Story) => {
	return <Button.Destructive {...props}>Basic Button</Button.Destructive>;
};
export const DestructiveIcon = (props: Story) => {
	return (
		<Button.Destructive icon="talend-plus" {...props}>
			Button with icon
		</Button.Destructive>
	);
};
export const DestructiveSmall = (props: Story) => {
	return (
		<Button.Destructive small {...props}>
			Small Button
		</Button.Destructive>
	);
};
export const DestructiveDisabled = (props: Story) => {
	return (
		<Button.Destructive disabled {...props}>
			Disabled Button
		</Button.Destructive>
	);
};
export const DestructiveDisabledFocusable = (props: Story) => {
	return (
		<Button.Destructive disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Destructive>
	);
};
export const DestructiveAsLink = (props: Story) => {
	return (
		<Button.Destructive as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Destructive>
	);
};

export const Secondary = (props: Story) => {
	return <Button.Secondary {...props}>Basic Button</Button.Secondary>;
};
export const SecondaryIcon = (props: Story) => {
	return (
		<Button.Secondary icon="talend-plus" {...props}>
			Button with icon
		</Button.Secondary>
	);
};
export const SecondarySmall = (props: Story) => {
	return (
		<Button.Secondary small {...props}>
			Small Button
		</Button.Secondary>
	);
};
export const SecondaryDisabled = (props: Story) => {
	return (
		<Button.Secondary disabled {...props}>
			Disabled Button
		</Button.Secondary>
	);
};
export const SecondaryDisabledFocusable = (props: Story) => {
	return (
		<Button.Secondary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Secondary>
	);
};
export const SecondaryAsLink = (props: Story) => {
	return (
		<Button.Secondary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Secondary>
	);
};

export const Tertiary = (props: Story) => {
	return <Button.Tertiary {...props}>Basic Button</Button.Tertiary>;
};
export const TertiaryIcon = (props: Story) => {
	return (
		<Button.Tertiary icon="talend-plus" {...props}>
			Button with icon
		</Button.Tertiary>
	);
};
export const TertiarySmall = (props: Story) => {
	return (
		<Button.Tertiary small {...props}>
			Small Button
		</Button.Tertiary>
	);
};
export const TertiaryDisabled = (props: Story) => {
	return (
		<Button.Tertiary disabled {...props}>
			Disabled Button
		</Button.Tertiary>
	);
};
export const TertiaryDisabledFocusable = (props: Story) => {
	return (
		<Button.Tertiary disabled focusable {...props}>
			Disabled Focusable Button
		</Button.Tertiary>
	);
};
export const TertiaryAsLink = (props: Story) => {
	return (
		<Button.Tertiary as="a" href="pouet" {...props}>
			This is an anchor
		</Button.Tertiary>
	);
};

export const Icon = (props: Story) => {
	return (
		<Button.Icon icon="talend-plus" {...props}>
			Button with icon
		</Button.Icon>
	);
};
export const IconDisabled = (props: Story) => {
	return (
		<Button.Icon disabled icon="talend-plus" {...props}>
			Disabled Button
		</Button.Icon>
	);
};
export const IconDisabledFocusable = (props: Story) => {
	return (
		<Button.Icon disabled focusable icon="talend-plus" {...props}>
			Disabled Focusable Button
		</Button.Icon>
	);
};
export const IconAsLink = (props: Story) => {
	return (
		<Button.Icon as="a" href="pouet" icon="talend-plus" {...props}>
			This is an anchor
		</Button.Icon>
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

export const TooltipButton = (props: Story) => (
	<Tooltip title="Relevant information about contacting the support">
		<Button.Primary icon="talend-bubbles" {...props}>
			Contact support
		</Button.Primary>
	</Tooltip>
);

export const Loading = {
	render: (props: Story) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
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
