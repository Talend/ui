import styled from 'styled-components';
import { tint, shade } from 'polished';
import ButtonBase from '../Button';
import tokens from '../../../tokens';

const ButtonPrimary = styled(ButtonBase)`
	color: ${tokens.colors.white};
	background: ${(props) => props.theme.colors.primaryColor};
	border-color: none;

	&:not([aria-disabled='true']):hover {
		background: ${(props) => shade(0.2, props.theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${(props) => shade(0.4, props.theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		background-color: ${tokens.colors.alto};
		border-color: ${tokens.colors.alto};
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.black)};
	}
`;

export default ButtonPrimary;
