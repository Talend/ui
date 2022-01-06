import React from 'react';

import Tag from '.';

export default {
	component: Tag,
};

const render = ({ variant, ...rest }: { variant?: keyof typeof Tag }) => {
	switch (variant) {
		case 'Information':
			return <Tag.Information {...rest} />;
		case 'Success':
			return <Tag.Success {...rest} />;
		case 'Warning':
			return <Tag.Warning {...rest} />;
		case 'Destructive':
			return <Tag.Destructive {...rest} />;
		default:
			return <Tag {...rest} />;
	}
};

const defaultProps = {
	children: 'Example',
};

export const Default = { args: defaultProps, render };

export const Information = {
	args: {
		...defaultProps,
		variant: 'Information',
	},
	render,
};

export const Success = { args: { ...defaultProps, variant: 'Success' }, render };

export const Warning = { args: { ...defaultProps, variant: 'Warning' }, render };

export const Destructive = { args: { ...defaultProps, variant: 'Destructive' }, render };

export const Ellipsis = {
	args: { ...defaultProps, children: 'Lorem ipsum dolor sit amet' },
	render,
};
