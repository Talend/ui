import React, { useState } from 'react';

import { VisuallyHidden } from 'reakit';

import Clickable from '../../components/Clickable';
import Dropdown from '../../components/Dropdown';
import HeaderBar from '../../components/HeaderBar';
import Modal from '../../components/Modal';
import Link from '../../components/Link';
import { Icon } from '../../components/Icon';
import { ButtonIconToggle } from '../../components/ButtonIcon';
import Tooltip from '../../components/Tooltip';

export default function HeaderBarBlock() {
	const [aboutOpen, setAboutOpen] = useState(false);
	return (
		<HeaderBar>
			<HeaderBar.Logo full>
				<Tooltip title="Talend Portal" placement="bottom">
					<Link href="#">
						<Icon name="talend-logo" />
						<VisuallyHidden>Talend</VisuallyHidden>
					</Link>
				</Tooltip>
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
					<Clickable onClick={() => {}}>App name</Clickable>
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<ButtonIconToggle
							isActive={false}
							size="S"
							onClick={() => {}}
							icon="talend-bell-notification"
						>
							Notifications
						</ButtonIconToggle>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<ButtonIconToggle isActive={false} size="S" onClick={() => {}} icon="talend-bubbles">
							Intercom
						</ButtonIconToggle>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Tooltip title="Go to online help" placement="bottom">
							<Link iconBefore="talend-info-circle" href="#">
								Help
							</Link>
						</Tooltip>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Dropdown
							aria-label="Apps switcher"
							items={[
								{ onClick: () => setAboutOpen(true), label: 'About', type: 'button' },
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
						{aboutOpen && (
							<Modal header={{ title: 'About this product' }} onClose={() => setAboutOpen(false)}>
								<p>Talend 2020</p>
							</Modal>
						)}
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
}
