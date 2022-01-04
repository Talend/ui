import React from 'react';

import { VisuallyHidden } from 'reakit';

import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import HeaderBar from '../../components/HeaderBar';
import Modal from '../../components/Modal';
import Link from '../../components/Link';
import { Icon } from '../../components/Icon';
import Toggle from '../../components/Toggle';
import Tooltip from '../../components/Tooltip';

export default function HeaderBarBlock() {
	const aboutModal = Modal.useDialogState();
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
				<Tooltip title="Change for another Talend app" placement="bottom">
					<Dropdown
						icon="talend-tdc-colored"
						aria-label="Apps switcher"
						items={[
							<Link iconBefore="talend-stop" href="#">
								App name 2
							</Link>,
							<Link iconBefore="talend-stop" href="#">
								App name 3
							</Link>,
							<Link iconBefore="talend-stop" href="#">
								App name 4
							</Link>,
							<Link iconBefore="talend-stop" href="#">
								App name 5
							</Link>,
						]}
					>
						App name
					</Dropdown>
				</Tooltip>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<Tooltip title="Notifications (you have no unread notifications)" placement="bottom">
							<Toggle icon="talend-bell-notification">Notifications</Toggle>
						</Tooltip>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Tooltip title="Chat with Talend support" placement="bottom">
							<Toggle icon="talend-bubbles">Intercom</Toggle>
						</Tooltip>
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
							icon="talend-user-circle"
							items={[
								<Button onClick={() => aboutModal.show()}>About</Button>,
								<></>,
								<Link href="#">Support</Link>,
								<Link href="#">Community</Link>,
								<></>,
								<Link href="#">Preferences</Link>,
								<Link href="#">Logout</Link>,
							]}
						>
							John Doe
						</Dropdown>
						<Modal.Dialog {...aboutModal} aria-label="About this product">
							<p>Talend 2020</p>
						</Modal.Dialog>
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
}
