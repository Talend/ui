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
		<HeaderBar.LogoFull>
			<Link href="#">
				<Icon name="talendLogo" />
				<VisuallyHidden>Talend</VisuallyHidden>
			</Link>
		</HeaderBar.LogoFull>
	</HeaderBar>
);

export const Portal = () => {
	const [visible, setVisible] = React.useState();
	return (
		<HeaderBar>
			<HeaderBar.Left>
				<HeaderBar.LogoFull>
					<Link href="#">
						<Icon name="talendLogo" />
						<VisuallyHidden>Talend</VisuallyHidden>
					</Link>
				</HeaderBar.LogoFull>
				<HeaderBar.Menu>
					<Button
						className={`menu ${visible ? 'menu--opened' : ''}`}
						onClick={() => setVisible(!visible)}
					>
						<Icon name="burger" />
						<VisuallyHidden>Toggle menu</VisuallyHidden>
					</Button>
				</HeaderBar.Menu>
			</HeaderBar.Left>
			<HeaderBar.Right visible={visible}>
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
		</HeaderBar>
	);
};

export const Apps = () => {
	const [visible, setVisible] = React.useState();
	return (
		<HeaderBar>
			<HeaderBar.Left>
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
				<HeaderBar.Menu>
					<Button
						className={`menu ${visible ? 'menu--opened' : ''}`}
						onClick={() => setVisible(!visible)}
					>
						<Icon name="burger" />
						<VisuallyHidden>Toggle menu</VisuallyHidden>
					</Button>
				</HeaderBar.Menu>
			</HeaderBar.Left>
			<HeaderBar.Right visible={visible}>
				<HeaderBar.Notification>
					<Tooltip title="Notifications (you have no unread notifications)" placement="bottom">
						<Button icon="bell">Notifications</Button>
					</Tooltip>
				</HeaderBar.Notification>
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
		</HeaderBar>
	);
};
