import React from 'react';

import { VisuallyHidden } from 'reakit';

import Clickable from '../../Clickable';
import { ButtonPrimary } from '../../Button';
import Dropdown from '../../Dropdown';
import { Icon } from '../../Icon';
import HeaderBar from '..';

// eslint-disable-next-line storybook/default-exports
export const PortalOnBoarding = () => (
	<HeaderBar>
		<HeaderBar.Logo full>
			<a href="#">
				<Icon name="talend-logo" />
				<VisuallyHidden>Talend</VisuallyHidden>
			</a>
		</HeaderBar.Logo>
	</HeaderBar>
);

export const Portal = () => {
	return (
		<HeaderBar>
			<HeaderBar.Logo full>
				<a href="#">
					<Icon name="talend-logo" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</a>
			</HeaderBar.Logo>
			<HeaderBar.Brand>
				<Dropdown
					aria-label="Apps switcher"
					items={[
						{ icon: 'talend-stop', href: '#', label: 'App name 1', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 2', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 3', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 4', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 5', type: 'link' },
					]}
				>
					<Clickable onClick={() => {}}>App switcher</Clickable>
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentRight>
					<HeaderBar.Item freeze>
						<ButtonPrimary onClick={() => {}} size="S">
							Subscribe now
						</ButtonPrimary>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Dropdown
							aria-label="Apps switcher"
							items={[
								{ onClick: () => {}, label: 'About', type: 'button' },
								{ type: 'divider' },
								{ href: '#', label: 'Support', type: 'link' },
								{ href: '#', label: 'Community', type: 'link' },
								{ type: 'divider' },
								{ href: '#', label: 'Preferences', type: 'link' },
								{ href: '#', label: 'Logout', type: 'link' },
							]}
						>
							<Clickable onClick={() => {}}>John Doe</Clickable>
						</Dropdown>
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
};

export const Apps = () => {
	return (
		<HeaderBar>
			<HeaderBar.Logo>
				<a href="#">
					<Icon name="talend-logo-square" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</a>
			</HeaderBar.Logo>
			<HeaderBar.Brand>
				<Dropdown
					aria-label="Apps switcher"
					items={[
						{ icon: 'talend-stop', href: '#', label: 'App name 1', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 2', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 3', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 4', type: 'link' },
						{ icon: 'talend-stop', href: '#', label: 'App name 5', type: 'link' },
					]}
				>
					<Clickable onClick={() => {}}>App switcher</Clickable>
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentLeft>
					<HeaderBar.Item>
						<Dropdown
							aria-label="API menu"
							items={[
								{ onClick: () => {}, label: 'Open', type: 'button' },
								{ type: 'divider' },
								{ onClick: () => {}, label: 'New API', type: 'button' },
								{ onClick: () => {}, label: 'Make a copy', type: 'button' },
								{ type: 'divider' },
								{ onClick: () => {}, label: 'Settings', type: 'button' },
								{ onClick: () => {}, label: 'Erase all API content', type: 'button' },
							]}
						>
							<Clickable onClick={() => {}}>API</Clickable>
						</Dropdown>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Clickable>Export</Clickable>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Clickable>Documentation (preview)</Clickable>
					</HeaderBar.Item>
					<HeaderBar.Item freeze>
						<span className="text">API Saved</span>
					</HeaderBar.Item>
				</HeaderBar.ContentLeft>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<Dropdown
							aria-label="Apps switcher"
							items={[
								{ onClick: () => {}, label: 'About', type: 'button' },
								{ type: 'divider' },
								{ href: '#', label: 'Support', type: 'link' },
								{ href: '#', label: 'Community', type: 'link' },
								{ type: 'divider' },
								{ href: '#', label: 'Preferences', type: 'link' },
								{ href: '#', label: 'Logout', type: 'link' },
							]}
						>
							<Clickable onClick={() => {}}>John Doe</Clickable>
						</Dropdown>
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
};
