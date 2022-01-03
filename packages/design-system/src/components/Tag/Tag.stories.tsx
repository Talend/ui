import React from 'react';

import Tag, { TagProps } from './Tag';

export default {
	component: Tag,
};

type TemplateType = {
	(props: TagProps): JSX.Element;
	args?: TagProps;
};

export const Template: TemplateType = ({ variant, ...rest }) => {
	const Component = Tag[variant] || Tag;
	Component.displayName = variant ? `Tag.${variant}` : 'Tag';
	return <Component {...rest} />;
};

const defaultProps = {
	children: 'Example',
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Information = Template.bind({});
Information.args = {
	...defaultProps,
	variant: 'Information',
};

export const Success = Template.bind({});
Success.args = { ...defaultProps, variant: 'Success' };

export const Warning = Template.bind({});
Warning.args = { ...defaultProps, variant: 'Warning' };

export const Destructive = Template.bind({});
Destructive.args = { ...defaultProps, variant: 'Destructive' };

export const Ellipsis = Template.bind({});
Ellipsis.args = {
	...defaultProps,
	children: 'Lorem ipsum dolor sit amet',
};
