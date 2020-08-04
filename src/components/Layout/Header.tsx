import React from 'react';
import Icon from '../Icon';

import * as S from './Header.style';

export type HeaderProps = {
	children?: any;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
	return (
		<S.Header>
			<Icon name="talend" />
			{children}
		</S.Header>
	);
};

export default Header;
