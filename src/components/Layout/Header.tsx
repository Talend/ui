import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Dialog from '../Dialog';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Link from '../Link';

import { VisuallyHidden } from 'reakit/VisuallyHidden';

import * as S from './Header.style';
import tokens from '../../tokens';

export type HeaderProps = {
	children?: any;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
	const dialog = Dialog.useDialogState();
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
					aria-label="Custom menu"
					items={[
						<Link iconBefore="talend">App name 2</Link>,
						<Link iconBefore="talend">App name 3</Link>,
						<Link iconBefore="talend">App name 4</Link>,
						<Link iconBefore="talend">App name 5</Link>,
					]}
				>
					App name
				</Dropdown>
			</S.Brand>
			{children}
			<S.Help>
				<Link iconBefore="information">Help</Link>
			</S.Help>
			<S.User>
				<Dropdown
					items={[
						<Button onClick={() => dialog.show()}>About</Button>,
						<></>,
						<Link href="#">Support</Link>,
						<></>,
						<Link href="#">Preferences</Link>,
						<Link href="#">Logout</Link>,
					]}
				>
					John Doe
				</Dropdown>
				<Dialog.Dialog {...dialog} aria-label="About this product">
					<p>Talend 2020</p>
				</Dialog.Dialog>
			</S.User>
		</S.Header>
	);
};

Header.Logo = S.Logo;
Header.Brand = S.Brand;
Header.Help = S.Help;
Header.User = S.User;

export default Header;
