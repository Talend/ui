import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link as RouterLink, BrowserRouter } from 'react-router-dom';
import Dropdown from './Dropdown';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '../Button';
import { ButtonIcon } from '../ButtonIcon';

export default {
	component: Dropdown,
};

export const WithIcons = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			aria-label="Switch between Talend applications"
			items={[
				{
					icon: 'talend-tdp-colored',
					label: 'Link with icon',
					href: 'https://tdp.cloud.talend.com',
					type: 'link',
				},
				{
					icon: 'talend-tmc-colored',
					label: 'Button with icon',
					onClick: () => action('clicked'),
					type: 'button',
				},
			]}
		>
			<ButtonTertiary isDropdown onClick={() => {}}>
				App switcher
			</ButtonTertiary>
		</Dropdown>
	),
};

export const WithDividers = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			aria-label="Custom menu"
			items={[
				{
					label: 'External link',
					href: 'https://community.talend.com/s/?language=en_US',
					target: '_blank',
					type: 'link',
				},
				{
					type: 'divider',
				},
				{
					label: 'Link',
					href: '/download',
					type: 'link',
				},
				{
					label: 'Another link',
					href: '/user',
					type: 'link',
				},
				{
					type: 'divider',
				},
				{
					label: 'Button',
					onClick: () => action('logged out'),
					type: 'button',
				},
			]}
		>
			<ButtonTertiary isDropdown onClick={() => {}}>
				Dropdown
			</ButtonTertiary>
		</Dropdown>
	),
};

export const WithTitle = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			aria-label="Custom menu"
			items={[
				{
					type: 'title',
					label: 'This is a title',
				},
				{
					type: 'divider',
				},
				{
					label: 'Link',
					href: '/download',
					type: 'link',
				},
				{
					label: 'Another link',
					href: '/user',
					type: 'link',
				},
			]}
		>
			<ButtonSecondary isDropdown onClick={() => {}}>
				Dropdown
			</ButtonSecondary>
		</Dropdown>
	),
};

export const WithRouterLinks = () => (
	<BrowserRouter>
		<Dropdown
			aria-label="Custom menu"
			items={[
				{
					label: 'Link',
					as: <RouterLink to="/destination" />,
					type: 'link',
				},
				{
					label: 'Another link',
					as: <RouterLink to="/destination-2" />,
					type: 'link',
				},
			]}
		>
			<ButtonIcon icon="talend-caret-down" onClick={() => {}}>
				Dropdown
			</ButtonIcon>
		</Dropdown>
	</BrowserRouter>
);

export const WithManyItems = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			aria-label="Custom menu"
			items={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eleifend justo. Donec ultrices justo sit amet lectus pellentesque ornare. Integer nec ultrices augue. Curabitur vel mi euismod ipsum fermentum vestibulum id non elit. Donec rhoncus est eu tristique lacinia. Maecenas a mi ut lectus commodo molestie nec sed ipsum. Morbi pellentesque nisi at libero scelerisque vestibulum. Fusce elementum volutpat lobortis. Vestibulum sed blandit est. Duis pulvinar, erat eget consectetur ornare, risus odio mattis velit, quis tempor turpis nulla viverra dolor. Suspendisse sapien tellus, iaculis a urna vel, dignissim dapibus ex.'
				.split(' ')
				.map(word => ({
					label: word,
					type: 'button',
					onClick() {
						// eslint-disable-next-line no-console
						console.log(`${word} click`);
					},
				}))}
		>
			<ButtonTertiary isDropdown onClick={() => {}}>
				Dropdown
			</ButtonTertiary>
		</Dropdown>
	),
};

export const WithLongText = {
	render: (props: Story) => (
		<Dropdown
			{...props}
			aria-label="Custom menu"
			items={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
				'Ut ultrices sit amet orci et venenatis.',
				'Suspendisse potenti. Fusce tristique pretium quam a lacinia. ',
				'Aliquam vel diam eu massa rhoncus tincidunt. ',
				'Suspendisse diam lorem, consectetur mollis tincidunt vel, gravida ac tortor.',
			].map(sentence => ({
				label: sentence,
				type: 'button',
				onClick() {
					// eslint-disable-next-line no-console
					console.log(`${sentence} click`);
				},
			}))}
		>
			<ButtonTertiary isDropdown onClick={() => {}}>
				Dropdown
			</ButtonTertiary>
		</Dropdown>
	),
};

export const Basic = () => (
	<BrowserRouter>
		<span style={{ padding: '20px' }}>
			<Dropdown
				aria-label="Exhaustive contents demo"
				items={[
					{
						type: 'title',
						label: 'Title - Buttons are below',
					},
					{ type: 'divider' },
					{
						label: 'Button',
						type: 'button',
						onClick: () => {
							action('clicked');
						},
					},
					{
						label: 'Button with icon',
						type: 'button',
						icon: 'talend-zoomin',
						onClick: () => {
							action('clicked');
						},
					},
					{
						label: 'Button with too much copy to create an overflow',
						icon: 'talend-plus-circle',
						type: 'button',
						onClick: () => {
							action('clicked');
						},
					},
					{ type: 'divider' },
					{
						type: 'title',
						label: 'Title - Links are below',
					},
					{ type: 'divider' },
					{
						label: 'Link',
						type: 'link',
						href: '/doc',
					},
					{
						label: 'Link with icon',
						type: 'link',
						href: '/doc',
						icon: 'talend-plus-circle',
					},
					{
						label: 'Router link with too much copy to create an overflow',
						type: 'link',
						icon: 'talend-plus-circle',
						as: <RouterLink to="/documentation" />,
					},
					{
						label: 'External link with too much copy to create an overflow',
						type: 'link',
						icon: 'talend-plus-circle',
						target: '_blank',
						href: 'https://talend.com',
					},
				]}
			>
				<ButtonPrimary onClick={() => {}} isDropdown>
					Dropdown
				</ButtonPrimary>
			</Dropdown>
		</span>
	</BrowserRouter>
);
