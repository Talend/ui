import styled from 'styled-components';
import { tint } from 'polished';
import ButtonBase from '../Button';
import tokens from '../../../tokens';

const ButtonSecondary = styled(ButtonBase)`
	color: ${({ theme }) => theme.colors.primaryColor};
	background: ${tokens.colors.white};

	&:not([aria-disabled='true']):hover {
		background: ${({ theme }) => tint(0.9, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${({ theme }) => tint(0.7, theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		border-color: ${tokens.colors.alto};
		background-color: ${tokens.colors.white};
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)};
	}
`;

export default ButtonSecondary;
