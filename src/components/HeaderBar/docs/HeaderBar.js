import React from 'react';

import { VisuallyHidden } from 'reakit/VisuallyHidden';

import Button from '../../Button';
import Dropdown from '../../Dropdown';
import Link from '../../Link';
import Icon from '../../Icon';
import Tooltip from '../../Tooltip';
import HeaderBar from '..';

import dark from '../../../themes/dark.theme';

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
	return (
		<HeaderBar>
			<HeaderBar.Logo full>
				<Link href="#">
					<Icon name="talendLogo" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
			</HeaderBar.Logo>
			<HeaderBar.Brand>
				<Dropdown
					aria-label="Apps switcher"
					items={[
						<Link iconBefore="talend" href="#">
							App name 1
						</Link>,
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
					Select an app
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<Button.Primary small theme={dark}>
							Subscribe now
						</Button.Primary>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Tooltip title="Chat with Talend support" placement="bottom">
							<Toggle icon="bubbles">Intercom</Toggle>
						</Tooltip>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Link iconBefore="information" href="#">
							Help
						</Link>
					</HeaderBar.Item>
					<HeaderBar.Item>
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
			<HeaderBar.Content>
				<HeaderBar.ContentLeft>
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
				</HeaderBar.ContentLeft>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<Tooltip title="Notifications (you have no unread notifications)" placement="bottom">
							<Toggle icon="bell">Notifications</Toggle>
						</Tooltip>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Tooltip title="Chat with Talend support" placement="bottom">
							<Toggle icon="bubbles">Intercom</Toggle>
						</Tooltip>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Link iconBefore="information" href="#">
							Help
						</Link>
					</HeaderBar.Item>
					<HeaderBar.Item>
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
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
};
