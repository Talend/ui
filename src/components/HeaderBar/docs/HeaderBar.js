import React from 'react';

import { VisuallyHidden } from 'reakit/VisuallyHidden';

import Button from '../../Button';
import Dropdown from '../../Dropdown';
import Modal from '../../Modal';
import Link from '../../Link';
import Icon from '../../Icon';
import Tooltip from '../../Tooltip';

import dark from '../../../themes/dark.theme';

import HeaderBar from '..';

export const PortalOnBoarding = () => (
	<HeaderBar>
		<HeaderBar.Logo full>
			<Link href="#">
				<Icon name="talendLogo" />
				<VisuallyHidden>Talend</VisuallyHidden>
			</Link>
		</HeaderBar.Logo>
	</HeaderBar>
);

export const Portal = () => {
	const [visible, setVisible] = React.useState();
	return (
		<HeaderBar>
			<HeaderBar.Logo full>
				<Link href="#">
					<Icon name="talendLogo" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
			</HeaderBar.Logo>
			<HeaderBar.MenuDisclosure>
				<Button
					className={`menu ${visible ? 'menu--opened' : ''}`}
					onClick={() => setVisible(!visible)}
				>
					<Icon name="burger" />
					<VisuallyHidden>Toggle menu</VisuallyHidden>
				</Button>
			</HeaderBar.MenuDisclosure>
			<HeaderBar.Menu visible={visible}>
				<HeaderBar.Right>
					<HeaderBar.CTA>
						<Button.Primary small theme={dark}>
							Subscribe now
						</Button.Primary>
					</HeaderBar.CTA>
					<HeaderBar.IPC>
						<Tooltip title="Chat with Talend support" placement="bottom">
							<Button icon="bubbles">Intercom</Button>
						</Tooltip>
					</HeaderBar.IPC>
					<HeaderBar.Help>
						<Link iconBefore="information" href="#">
							Help
						</Link>
					</HeaderBar.Help>
					<HeaderBar.User>
						<Dropdown
							icon="user"
							items={[
								<Button>About</Button>,
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
					</HeaderBar.User>
				</HeaderBar.Right>
			</HeaderBar.Menu>
		</HeaderBar>
	);
};

export const Apps = () => {
	const [visible, setVisible] = React.useState();
	return (
		<HeaderBar>
			<HeaderBar.Logo>
				<Link href="#">
					<Icon name="talend" preserveColors />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
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
			<HeaderBar.MenuDisclosure>
				<Button
					className={`menu ${visible ? 'menu--opened' : ''}`}
					onClick={() => setVisible(!visible)}
				>
					<Icon name="burger" />
					<VisuallyHidden>Toggle menu</VisuallyHidden>
				</Button>
			</HeaderBar.MenuDisclosure>
			<HeaderBar.Menu visible={visible}>
				<HeaderBar.Left>
					<HeaderBar.Item>
						<Dropdown
							items={[
								<Button.Secondary>Open</Button.Secondary>,
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
						<Tooltip title="Notifications (you have no unread notifications)" placement="bottom">
							<Button icon="bell">Notifications</Button>
						</Tooltip>
					</HeaderBar.Notifications>
					<HeaderBar.IPC>
						<Tooltip title="Chat with Talend support" placement="bottom">
							<Button icon="bubbles">Intercom</Button>
						</Tooltip>
					</HeaderBar.IPC>
					<HeaderBar.Help>
						<Link iconBefore="information" href="#">
							Help
						</Link>
					</HeaderBar.Help>
					<HeaderBar.User>
						<Dropdown
							icon="user"
							items={[
								<Button>About</Button>,
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
					</HeaderBar.User>
				</HeaderBar.Right>
			</HeaderBar.Menu>
		</HeaderBar>
	);
};
