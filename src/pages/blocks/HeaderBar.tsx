import React from 'react';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import HeaderBar from '../../components/HeaderBar';
import Modal from '../../components/Modal';
import Link from '../../components/Link';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';

import dark from '../../themes/dark.theme';

export default function HeaderBarBlock() {
	const aboutModal = Modal.useDialogState();
	return (
		<HeaderBar>
			<HeaderBar.Left>
				<HeaderBar.Logo>
					<Tooltip title="Talend Portal" placement="bottom">
						<Link href="#">
							<Icon name="talend" preserveColors />
							<VisuallyHidden>Talend</VisuallyHidden>
						</Link>
					</Tooltip>
				</HeaderBar.Logo>
				<HeaderBar.Brand>
					<Dropdown
						icon="talend"
						aria-label="Apps switcher"
						items={[
							<Link iconBefore="talend" href="#">
								App name 2
							</Link>,
							<Link iconBefore="talend" href="#">
								App name 3
							</Link>,
							<Link iconBefore="talend" href="#">
								App name 4
							</Link>,
							<Link iconBefore="talend" href="#">
								App name 5
							</Link>,
						]}
					>
						App name
					</Dropdown>
				</HeaderBar.Brand>
				<HeaderBar.Item>
					<Dropdown
						items={[
							<Button>Open</Button>,
							<></>,
							<Button>New API</Button>,
							<Button>Make a copy</Button>,
							<></>,
							<Dropdown
								items={[
									<strong disabled>OpenAPI Specification / Swagger</strong>,
									<Button>OAS 3.0</Button>,
									<Button>OAS / Swagger 2.0</Button>,
									<Button>Swagger 1.2</Button>,
									<></>,
									<strong disabled>RAML</strong>,
									<Button>RAML 1.0</Button>,
									<Button>RAML 0.8</Button>,
								]}
							>
								Import
							</Dropdown>,
							<Button>Settings</Button>,
							<Button>Erase all API content</Button>,
						]}
					>
						API
					</Dropdown>
				</HeaderBar.Item>
				<HeaderBar.Item>
					<Button>Export</Button>
				</HeaderBar.Item>
				<HeaderBar.Item>
					<Button>Documentation (preview)</Button>
				</HeaderBar.Item>
				<HeaderBar.Item>
					<span className="text">API Saved</span>
				</HeaderBar.Item>
			</HeaderBar.Left>
			<HeaderBar.Right>
				<HeaderBar.CTA>
					<Button.Primary small theme={dark}>
						Subscribe now
					</Button.Primary>
				</HeaderBar.CTA>
				<HeaderBar.Notifications>
					<Button.Icon icon="bell">Notifications</Button.Icon>
				</HeaderBar.Notifications>
				<HeaderBar.IPC>
					<Tooltip title="Chat with Talend support" placement="bottom">
						<Button.Icon icon="bubbles">IPC</Button.Icon>
					</Tooltip>
				</HeaderBar.IPC>
				<HeaderBar.Help>
					<Link iconBefore="information" href="#">
						Help
					</Link>
				</HeaderBar.Help>
				<HeaderBar.User>
					<Dropdown
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
				</HeaderBar.User>
			</HeaderBar.Right>
		</HeaderBar>
	);
}
