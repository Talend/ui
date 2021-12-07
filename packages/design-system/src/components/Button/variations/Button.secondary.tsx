import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import ButtonPrimary from './Button.primary';
import { ButtonProps } from '../Button';

const button: StyledFunction<typeof ButtonPrimary> = styled(ButtonPrimary);

const ButtonSecondary: React.FC<ButtonProps> = button.attrs({
	className: 'btn--secondary',
})`
	--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};
	--t-button-background-color: none;

	&:hover {
		--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryHoverBackgroundColor};
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonSecondaryHoverBackgroundColor};
	}

	&:active {
		--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryActiveBackgroundColor};
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonSecondaryActiveBackgroundColor};
	}
`;

ButtonSecondary.displayName = 'Button.Secondary';

export default ButtonSecondary;
