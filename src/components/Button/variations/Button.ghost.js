import styled from 'styled-components';
import { tint } from 'polished';
import ButtonBase from '../Button';
import tokens from '../../../tokens';

const ButtonGhost = styled(ButtonBase)`
	border: none;
	color: ${({ theme }) => theme.colors.primaryColor};

	&:not([aria-disabled='true']):hover,
	&:not([aria-disabled='true']):focus {
		background: ${({ theme }) => tint(0.9, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${({ theme }) => tint(0.7, theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		background-color: ${tokens.colors.transparent};
	}
`;

export default ButtonGhost;
