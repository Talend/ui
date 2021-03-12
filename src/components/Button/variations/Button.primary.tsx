import React from 'react';
import styled from 'styled-components';
import ButtonBase from './Button.base';
import { ButtonProps } from '../Button';

const ButtonPrimary: React.FC<ButtonProps> = styled(ButtonBase).attrs({
	className: 'btn--primary',
})`
	color: ${({ theme }) => theme.colors.buttonPrimaryColor};
	background-color: ${({ theme }) => theme.colors.buttonPrimaryBackgroundColor};
	border-color: ${({ theme }) => theme.colors.buttonPrimaryBackgroundColor};

	&:hover {
		background-color: ${({ theme }) => theme.colors.buttonPrimaryHoverBackgroundColor};
		border-color: ${({ theme }) => theme.colors.buttonPrimaryHoverBackgroundColor};
	}

	&:active {
		background-color: ${({ theme }) => theme.colors.buttonPrimaryActiveBackgroundColor};
		border-color: ${({ theme }) => theme.colors.buttonPrimaryActiveBackgroundColor};
	}
`;

export default ButtonPrimary;
