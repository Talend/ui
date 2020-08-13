import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

import * as S from './Header.style';

export type HeaderProps = {
	children?: any;
};

const Logo = styled.span.attrs({
	className: 'header__logo',
})``;

const Brand = styled.span.attrs({
	className: 'header__brand',
})``;

const Header: React.FC<HeaderProps> = ({ children }) => {
	return (
		<S.Header>
			<Logo>
				<Icon name="talend" preserveColors />
			</Logo>
			{children}
		</S.Header>
	);
};

Header.Logo = Logo;
Header.Brand = Brand;

export default Header;
