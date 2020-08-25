import React from 'react';

import Button from '../Button';
import Modal from '../Modal';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Link from '../Link';

import { VisuallyHidden } from 'reakit/VisuallyHidden';

import * as S from './Header.style';

export type HeaderProps = {
	children?: any;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
	const aboutModal = Modal.useDialogState();
	return (
		<S.Header>
			<S.Logo>
				<Link href="#">
					<Icon name="talend" preserveColors />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
			</S.Logo>
			<S.Brand>
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
			</S.Brand>
			{children}
			<S.Help>
				<Link iconBefore="information" href="#">
					Help
				</Link>
			</S.Help>
			<S.User>
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
			</S.User>
		</S.Header>
	);
};

const HeaderComponent = Header as typeof Header & {
	Logo: typeof S.Logo;
	Brand: typeof S.Brand;
	Help: typeof S.Help;
	User: typeof S.User;
};

HeaderComponent.Logo = S.Logo;
HeaderComponent.Brand = S.Brand;
HeaderComponent.Help = S.Help;
HeaderComponent.User = S.User;

export default HeaderComponent;
