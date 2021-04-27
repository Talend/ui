import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from './Button.primary';
import { ButtonProps } from '../Button';

const ButtonSecondary: React.FC<ButtonProps> = styled(ButtonPrimary).attrs({
	className: 'btn--secondary',
})`
	--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};
	--t-button-background-color: none;

	&:hover {
		--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryHoverBackgroundColor};
		--t-button-background-color: ${({ theme }) =>
			theme.colors?.buttonSecondaryHoverBackgroundColor};
	}

	&:active {
		--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryActiveBackgroundColor};
		--t-button-background-color: ${({ theme }) =>
			theme.colors?.buttonSecondaryActiveBackgroundColor};
	}
`;

export default ButtonSecondary;
