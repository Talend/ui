import React from 'react';
import InlineMessage from '.';
import Link from '../Link';

export default { component: InlineMessage };

const render = ({ variant, ...rest }: { variant: keyof typeof InlineMessage }) => {
	switch (variant) {
		case 'Information':
			return <InlineMessage.Information {...rest} />;
		case 'Success':
			return <InlineMessage.Success {...rest} />;
		case 'Warning':
			return <InlineMessage.Warning {...rest} />;
		case 'Destructive':
			return <InlineMessage.Destructive {...rest} />;
		default:
			return null;
	}
};

const defaultProps = {
	title: 'Lorem ipsum',
	description:
		'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
	link: <Link href="#">See more</Link>,
};

export const Information = {
	args: {
		...defaultProps,
		variant: 'Information',
	},
	render,
};
export const Success = {
	args: {
		...defaultProps,
		variant: 'Success',
	},
	render,
};
export const Warning = {
	args: {
		...defaultProps,
		variant: 'Warning',
	},
	render,
};
export const Destructive = {
	args: {
		...defaultProps,
		variant: 'Destructive',
	},
	render,
};

export const InformationSmall = {
	args: {
		...Information.args,
		small: true,
	},
	render,
};
export const SuccessSmall = {
	args: {
		...Success.args,
		small: true,
	},
	render,
};
export const WarningSmall = {
	args: {
		...Warning.args,
		small: true,
	},
	render,
};
export const DestructiveSmall = {
	args: {
		...Destructive.args,
		small: true,
	},
	render,
};

export const InformationBackground = {
	args: {
		...Information.args,
		withBackground: true,
	},
	render,
};
export const SuccessBackground = {
	args: {
		...Success.args,
		withBackground: true,
	},
	render,
};
export const WarningBackground = {
	args: {
		...Warning.args,
		withBackground: true,
	},
	render,
};
export const DestructiveBackground = {
	args: {
		...Destructive.args,
		withBackground: true,
	},
	render,
};

export const InformationBackgroundSmall = {
	args: {
		...Information.args,
		small: true,
		withBackground: true,
	},
	render,
};
export const SuccessBackgroundSmall = {
	args: {
		...Success.args,
		small: true,
		withBackground: true,
	},
	render,
};
export const WarningBackgroundSmall = {
	args: {
		...Warning.args,
		small: true,
		withBackground: true,
	},
	render,
};
export const DestructiveBackgroundSmall = {
	args: {
		...Destructive.args,
		small: true,
		withBackground: true,
	},
	render,
};
