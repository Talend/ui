import styled from 'styled-components';
import ButtonBase, { ButtonProps } from '../Button';
import React from 'react';

const ButtonPrimary: React.FC<ButtonProps> = styled(ButtonBase)(
	({ theme }) => `
	color: ${theme.colors.buttonPrimaryColor};
	background-color: ${theme.colors.buttonPrimaryBackgroundColor};
	border-color: ${theme.colors.buttonPrimaryBackgroundColor};

	&:not([aria-disabled='true']):hover {
		background-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
        border-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
	}

	&:not([aria-disabled='true']):active {
		background-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
        border-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
	}

	&[aria-disabled='true'] {
		color: ${theme.colors.buttonDisabledColor};
		background-color: ${theme.colors.buttonDisabledBackgroundColor};
		border-color: ${theme.colors.buttonDisabledBackgroundColor};
	}
`,
);

export default ButtonPrimary;
