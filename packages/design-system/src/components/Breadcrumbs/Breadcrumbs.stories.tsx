import React from 'react';
import { ComponentStory } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';

export default {
	component: Breadcrumbs,
};

const BreadcrumbsTemplate: ComponentStory<typeof Breadcrumbs> = args => {
	return <Breadcrumbs {...args} />;
};

export const Basic = BreadcrumbsTemplate.bind({});
Basic.args = {
	items: [
		{
			label: 'Link example',
			href: '/',
		},
		{
			label: 'Label',
			href: '/here',
		},
	],
};

export const Advanced = BreadcrumbsTemplate.bind({});
Advanced.args = {
	items: [
		{
			label: 'Link example',
			href: '/',
		},
		{
			label: 'Link example',
			href: '/here',
		},
		{
			label: 'Link example',
			href: '/there',
			target: '_blank',
		},
		{
			label: 'Link example',
			href: '/away',
		},
		{
			label: 'Link example thats is much too long and should create an ellipsis if all is well',
			href: '/more',
		},
		{
			label: 'Label',
			href: '/here',
		},
	],
};
