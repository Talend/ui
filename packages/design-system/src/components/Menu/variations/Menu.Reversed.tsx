import styled from 'styled-components';
import { tint } from 'polished';

import Menu from '../Menu';

import tokens from '../../../tokens';

import * as S from '../Menu.style';

const ReversedMenu = styled(Menu).attrs({
	className: 'c-menu--reversed',
})`
	color: ${tokens.colors.gray[700]};
	background: ${tokens.colors.gray[50]};

	${S.MenuItem} {
		&:hover {
			background: ${tint(0.9, tokens.colors.gray[900])};
		}

		&:active {
			background: ${tint(0.8, tokens.colors.gray[900])};
		}
	}
`;

export default ReversedMenu;
