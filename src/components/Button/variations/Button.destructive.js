import styled from 'styled-components';
import { shade } from 'polished';
import ButtonPrimary from './Button.primary';
import tokens from '../../../tokens';

const ButtonDestructive = styled(ButtonPrimary)`
	background: ${props => props.theme.colors.destructiveColor};

	&:not([aria-disabled='true']):hover {
		background: ${props => shade(0.2, props.theme.colors.destructiveColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${props => shade(0.4, props.theme.colors.destructiveColor)};
	}
`;

ButtonDestructive.defaultProps = { theme: tokens };

export default ButtonDestructive;
