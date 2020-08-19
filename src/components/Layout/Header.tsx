import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Dialog from '../Dialog';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Link from '../Link';

import * as S from './Header.style';
import tokens from '../../tokens';

export type HeaderProps = {
	children?: any;
};

const borderLeft = props => `
	border-left: 1px solid white;
`;
const HeaderItem = styled.span.attrs({
	className: 'header__item',
})`
	padding: 0 1.5rem;
`;
const Logo = styled(HeaderItem).attrs({
	className: 'header__logo',
})`
	margin-right: 1.5rem;
	max-width: 4.5rem;

	svg {
		height: ${tokens.sizes.xl};
	}
`;
const Brand = styled(HeaderItem).attrs({
	className: 'header__brand',
})`
	${borderLeft};
`;
const Help = styled(HeaderItem).attrs({
	className: 'header__help',
})`
	margin-left: auto;
`;
const User = styled(HeaderItem).attrs({
	className: 'header__user',
})`
	${borderLeft};
`;

const Header: React.FC<HeaderProps> = ({ children }) => {
	return (
		<S.Header>
			<Logo>
				<Link href="#">
					<Icon name="talend" preserveColors />
				</Link>
			</Logo>
			<Brand>
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
			</Brand>
			{children}
			<Help>
				<Link iconBefore="information">Help</Link>
			</Help>
			<User>
				<Dropdown
					aria-label="Custom menu"
					items={[
						<Button>About</Button>,
						<Dropdown.Separator />,
						<Link>Support</Link>,
						<Link>Preferences</Link>,
						<Dropdown.Separator />,
						<Link>Logout</Link>,
					]}
				>
					John Doe
				</Dropdown>
			</User>
		</S.Header>
	);
};

export default Header;
