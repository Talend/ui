import styled from 'styled-components';
import { shade } from 'polished';
import ButtonPrimary from './Button.primary';

const ButtonDestructive = styled(ButtonPrimary)`
	background-color: ${({ theme }) => theme.colors.destructiveColor};

	&:not([aria-disabled='true']):hover {
		background-color: ${({ theme }) => shade(0.2, theme.colors.destructiveColor)};
	}

	&:not([aria-disabled='true']):active {
		background-color: ${({ theme }) => shade(0.4, theme.colors.destructiveColor)};
	}
`;

export default ButtonDestructive;
