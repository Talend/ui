import React from 'react';
import { Story } from '@storybook/react';
import Dropdown from '.';
import Button from '../Button';

export default {
	component: Dropdown,
};

export const WithIcons = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			as={Button.Tertiary}
			aria-label="Switch between Talend applications"
			items={[
				{
					icon: 'talend-tdp-colored',
					label: 'Data Preparation',
					href: 'https://tdp.cloud.talend.com',
				},
				{
					icon: 'talend-tmc-colored',
					label: 'Management Console',
					href: 'https://tdp.cloud.talend.com',
				},
				{
					icon: 'talend-tdc-colored',
					label: 'Data Inventory',
					href: 'https://tdp.cloud.talend.com',
				},
			]}
		>
			App switcher
		</Dropdown>
	),
};

export const WithDividers = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			as={Button.Primary}
			aria-label="Custom menu"
			items={[
				{
					label: 'Community',
					href: 'https://community.talend.com/s/?language=en_US',
				},
				{
					label: 'Support',
					href: 'https://www.talend.com/technical-support/',
				},
				{
					divider: true,
				},
				{
					label: 'Downloads',
					href: '/download',
				},
				{
					label: 'Account & Subscription',
					href: '/subscription',
				},
				{
					label: 'Profile preferences',
					href: '/user',
				},
				{
					divider: true,
				},
				{
					label: 'Logout',
					href: '/logout',
				},
			]}
		>
			Dropdown
		</Dropdown>
	),
};

export const WithManyItems = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			as={Button.Primary}
			aria-label="Custom menu"
			items={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eleifend justo. Donec ultrices justo sit amet lectus pellentesque ornare. Integer nec ultrices augue. Curabitur vel mi euismod ipsum fermentum vestibulum id non elit. Donec rhoncus est eu tristique lacinia. Maecenas a mi ut lectus commodo molestie nec sed ipsum. Morbi pellentesque nisi at libero scelerisque vestibulum. Fusce elementum volutpat lobortis. Vestibulum sed blandit est. Duis pulvinar, erat eget consectetur ornare, risus odio mattis velit, quis tempor turpis nulla viverra dolor. Suspendisse sapien tellus, iaculis a urna vel, dignissim dapibus ex.'
				.split(' ')
				.map(word => ({
					label: word,
					onClick() {
						console.log(`${word} click`);
					},
				}))}
		>
			Dropdown
		</Dropdown>
	),
};

export const WithLongText = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			as={Button.Primary}
			aria-label="Custom menu"
			items={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
				'Ut ultrices sit amet orci et venenatis.',
				'Suspendisse potenti. Fusce tristique pretium quam a lacinia. ',
				'Aliquam vel diam eu massa rhoncus tincidunt. ',
				'Suspendisse diam lorem, consectetur mollis tincidunt vel, gravida ac tortor.',
			].map(sentence => ({
				label: sentence,
			}))}
		>
			Dropdown
		</Dropdown>
	),
};
