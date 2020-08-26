import React from 'react';
import styled from 'styled-components';
import { VisuallyHidden } from 'reakit/VisuallyHidden';

import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Layout/Header';
import Modal from '../../components/Modal';
import Link from '../../components/Link';
import Icon from '../../components/Icon';

import tokens from '../../tokens';

const CTA = styled(Button).attrs({
	small: true,
})(
	({ theme }) => `
		font-weight: ${tokens.fontWeights.semiBold};
		color: ${tokens.colors.gray900};
		background: ${tokens.colors.paleCyan500};
`,
);

export default function HeaderBar() {
	const aboutModal = Modal.useDialogState();
	return (
		<Header>
			<Header.Logo>
				<Link href="#">
					<Icon name="talend" preserveColors />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
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
								<span disabled>OpenAPI Specification / Swagger</span>,
								<Button>OAS 3.0</Button>,
								<Button>OAS / Swagger 2.0</Button>,
								<Button>Swagger 1.2</Button>,
								<></>,
								<span disabled>RAML</span>,
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
				<Button.Icon icon="bubbles">IPC</Button.Icon>
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
