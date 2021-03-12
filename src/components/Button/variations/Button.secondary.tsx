import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from './Button.primary';
import { ButtonProps } from '../Button';

const ButtonSecondary: React.FC<ButtonProps> = styled(ButtonPrimary).attrs({
	className: 'btn--secondary',
})`
	color: ${({ theme }) => theme.colors.buttonPrimaryBackgroundColor};
	background: none;

	&:hover {
		color: ${({ theme }) => theme.colors.buttonPrimaryHoverBackgroundColor};
		background-color: ${({ theme }) => theme.colors.buttonSecondaryHoverBackgroundColor};
	}

	&:active {
		color: ${({ theme }) => theme.colors.buttonPrimaryActiveBackgroundColor};
		background-color: ${({ theme }) => theme.colors.buttonSecondaryActiveBackgroundColor};
	}
`;

export default ButtonSecondary;
