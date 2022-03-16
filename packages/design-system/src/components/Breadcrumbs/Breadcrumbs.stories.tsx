import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default {
	component: Breadcrumbs,
};

export const Basic = () => (
	<Breadcrumbs
		items={[
			{
				label: 'Link example',
				href: '/',
			},
			{
				label: 'Label',
				href: '/here',
			},
		]}
	/>
);

export const Advanced = () => (
	<Breadcrumbs
		items={[
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
				label: 'Link example that is much too long and should create an ellipsis if all is well',
				href: '/more',
			},
			{
				label: 'Label',
				href: '/here',
			},
		]}
	/>
);
