import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import ButtonBase from './Button.base';
import { ButtonProps } from '../Button';

const button: StyledFunction<typeof ButtonBase> = styled(ButtonBase);

const ButtonPrimary: React.FC<ButtonProps> = button.attrs({
	className: 'btn--primary',
})`
	--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryColor};
	--t-button-background-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};
	--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};

	&:hover {
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonPrimaryHoverBackgroundColor};
		--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryHoverBackgroundColor};
	}

	&:active {
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonPrimaryActiveBackgroundColor};
		--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryActiveBackgroundColor};
	}
`;

ButtonPrimary.displayName = 'Button.Primary';

export default ButtonPrimary;
