import styled from 'styled-components';
import { tint, shade } from 'polished';
import ButtonBase from '../Button';
import tokens from '../../../tokens';

const ButtonPrimary = styled(ButtonBase)`
	color: ${tokens.colors.white};
	background-color: ${({ theme }) => theme.colors.primaryColor};
	border-color: ${tokens.colors.transparent};

	&:not([aria-disabled='true']):hover {
		background-color: ${({ theme }) => shade(0.2, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background-color: ${({ theme }) => shade(0.4, theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)};
		background-color: ${tokens.colors.alto};
		border-color: ${tokens.colors.alto};
	}
`;

export default ButtonPrimary;
