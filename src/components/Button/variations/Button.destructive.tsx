import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from './Button.primary';
import { ButtonProps } from '../Button';

const ButtonDestructive: React.FC<ButtonProps> = styled(ButtonPrimary).attrs({
	className: 'btn--destructive',
})`
	background-color: ${({ theme }) => theme.colors.buttonDestructiveBackgroundColor};
	border-color: ${({ theme }) => theme.colors.buttonDestructiveBackgroundColor};

	&:hover {
		background-color: ${({ theme }) => theme.colors.buttonDestructiveHoverBackgroundColor};
		border-color: ${({ theme }) => theme.colors.buttonDestructiveHoverBackgroundColor};
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.buttonDestructiveActiveBackgroundColor};
		border-color: ${({ theme }) => theme.colors.buttonDestructiveActiveBackgroundColor};
	}
`;

export default ButtonDestructive;
