import React from 'react';
import styled from 'styled-components';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Layout/Header';
import Modal from '../../components/Modal';
import Link from '../../components/Link';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';

import tokens from '../../tokens';

import dark from '../../themes/dark.theme';

const CTA = styled(Button.Primary).attrs({
	small: true,
	theme: dark,
})``;

export default function HeaderBar() {
	const aboutModal = Modal.useDialogState();
	return (
		<Header>
			<Header.Logo>
				<Tooltip title="Talend Portal" placement="bottom">
					<Link href="#">
						<Icon name="talend" preserveColors />
						<VisuallyHidden>Talend</VisuallyHidden>
					</Link>
				</Tooltip>
			</Header.Logo>
			<Header.Brand>
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
			</Header.Brand>
			<Header.Item>
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
			</Header.Item>
			<Header.Item>
				<Button>Export</Button>
			</Header.Item>
			<Header.Item>
				<Button>Documentation (preview)</Button>
			</Header.Item>
			<Header.Item>
				<span className="text">API Saved</span>
			</Header.Item>
			<Header.CTA>
				<CTA>Subscribe now</CTA>
			</Header.CTA>
			<Header.Notification>
				<Button.Icon icon="bell">Notifications</Button.Icon>
			</Header.Notification>
			<Header.IPC>
				<Tooltip title="Chat with Talend support" placement="bottom">
					<Button.Icon icon="bubbles">IPC</Button.Icon>
				</Tooltip>
			</Header.IPC>
			<Header.Help>
				<Link iconBefore="information" href="#">
					Help
				</Link>
			</Header.Help>
			<Header.User>
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
			</Header.User>
		</Header>
	);
}
