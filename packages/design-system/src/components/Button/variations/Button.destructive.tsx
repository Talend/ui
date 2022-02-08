import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import ButtonPrimary from './Button.primary';
import { ButtonProps } from '../Button';

const button: StyledFunction<typeof ButtonPrimary> = styled(ButtonPrimary);

const ButtonDestructive: React.FC<ButtonProps> = button.attrs({
	className: 'btn--destructive',
})`
	--t-button-background-color: ${({ theme }) => theme.colors?.buttonDestructiveBackgroundColor};
	--t-button-border-color: ${({ theme }) => theme.colors?.buttonDestructiveBackgroundColor};

	&:hover {
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonDestructiveHoverBackgroundColor};
		--t-button-border-color: ${({ theme }) => theme.colors?.buttonDestructiveHoverBackgroundColor};
	}

	&:active {
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonDestructiveActiveBackgroundColor};
		--t-button-border-color: ${({ theme }) => theme.colors?.buttonDestructiveActiveBackgroundColor};
	}
`;

ButtonDestructive.displayName = 'Button.Destructive';

export default ButtonDestructive;
