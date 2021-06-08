import React from 'react';
import InlineMessage from './InlineMessage';
import Link from '../Link';

export const Template = ({ variant, ...rest }) => {
	const Component = InlineMessage[variant] || InlineMessage;
	Component.displayName = variant ? `InlineMessage.${variant}` : 'InlineMessage';
	return <Component {...rest} />;
};

export const defaultProps = {
	title: 'Lorem ipsum',
	description:
		'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
	link: <Link href="#">See more</Link>,
};

export const Information = Template.bind({});
Information.args = {
	...defaultProps,
	variant: 'Information',
};
export const Success = Template.bind({});
Success.args = {
	...defaultProps,
	variant: 'Success',
};
export const Warning = Template.bind({});
Warning.args = {
	...defaultProps,
	variant: 'Warning',
};
export const Destructive = Template.bind({});
Destructive.args = {
	...defaultProps,
	variant: 'Destructive',
};

export const InformationSmall = Template.bind({});
InformationSmall.args = {
	...Information.args,
	small: true,
};
export const SuccessSmall = Template.bind({});
SuccessSmall.args = {
	...Success.args,
	small: true,
};
export const WarningSmall = Template.bind({});
WarningSmall.args = {
	...Warning.args,
	small: true,
};
export const DestructiveSmall = Template.bind({});
DestructiveSmall.args = {
	...Destructive.args,
	small: true,
};

export const InformationBackground = Template.bind({});
InformationBackground.args = {
	...Information.args,
	withBackground: true,
};
export const SuccessBackground = Template.bind({});
SuccessBackground.args = {
	...Success.args,
	withBackground: true,
};
export const WarningBackground = Template.bind({});
WarningBackground.args = {
	...Warning.args,
	withBackground: true,
};
export const DestructiveBackground = Template.bind({});
DestructiveBackground.args = {
	...Destructive.args,
	withBackground: true,
};

export const InformationBackgroundSmall = Template.bind({});
InformationBackgroundSmall.args = {
	...Information.args,
	small: true,
	withBackground: true,
};
export const SuccessBackgroundSmall = Template.bind({});
SuccessBackgroundSmall.args = {
	...Success.args,
	small: true,
	withBackground: true,
};
export const WarningBackgroundSmall = Template.bind({});
WarningBackgroundSmall.args = {
	...Warning.args,
	small: true,
	withBackground: true,
};
export const DestructiveBackgroundSmall = Template.bind({});
DestructiveBackgroundSmall.args = {
	...Destructive.args,
	small: true,
	withBackground: true,
};
