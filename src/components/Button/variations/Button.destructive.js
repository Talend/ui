import styled from 'styled-components';
import { shade } from 'polished';
import ButtonPrimary from './Button.primary';

const ButtonDestructive = styled(ButtonPrimary)`
	background: ${(props) => props.theme.colors.destructiveColor};

	&:not([aria-disabled='true']):hover {
		background: ${(props) => shade(0.2, props.theme.colors.destructiveColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${(props) => shade(0.4, props.theme.colors.destructiveColor)};
	}
`;

export default ButtonDestructive;
