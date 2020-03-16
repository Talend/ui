import styled from 'styled-components';
import { tint, shade } from 'polished';
import tokens from '../../../tokens';
import ButtonBase from '../Button';

const ButtonPrimary = styled(ButtonBase)`
	color: ${props => props.theme.colors.white};
	background: ${props => props.theme.colors.primaryColor};
	border-color: none;

	&:not([aria-disabled='true']):hover {
		background: ${props => shade(0.2, props.theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${props => shade(0.4, props.theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		background-color: ${props => props.theme.colors.alto};
		border-color: ${props => props.theme.colors.alto};
		color: ${props => tint(1 - props.theme.opacity.disabled, props.theme.colors.black)};
	}
`;

ButtonPrimary.defaultProps = { theme: tokens };

export default ButtonPrimary;
