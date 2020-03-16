import styled from 'styled-components';
import { tint } from 'polished';
import tokens from '../../../tokens';
import ButtonBase from '../Button';

const ButtonSecondary = styled(ButtonBase)`
	color: ${props => props.theme.colors.primaryColor};
	background: ${props => props.theme.colors.white};

	&:not([aria-disabled='true']):hover {
		background: ${props => tint(0.9, props.theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${props => tint(0.7, props.theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		border-color: ${props => props.theme.colors.alto};
		background-color: ${props => props.theme.colors.white};
		color: ${props => tint(1 - props.theme.opacity.disabled, props.theme.colors.black)};
	}
`;

ButtonSecondary.defaultProps = { theme: tokens };

export default ButtonSecondary;
