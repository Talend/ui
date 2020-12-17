import React from 'react';
import styled from 'styled-components';
import ButtonBase from './Button.base';
import { ButtonProps } from '../Button';

const ButtonPrimary: React.FC<ButtonProps> = styled(ButtonBase).attrs({
	className: 'btn--primary',
})(
	({ theme }) => `
	color: ${theme.colors.buttonPrimaryColor};
	background-color: ${theme.colors.buttonPrimaryBackgroundColor};
	border-color: ${theme.colors.buttonPrimaryBackgroundColor};

	&:hover {
		background-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
        border-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
	}

	&:active {
		background-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
        border-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
	}
`,
);

export default ButtonPrimary;
