import styled from 'styled-components';
import ButtonBase, { ButtonProps } from '../Button';
import React from 'react';

const ButtonSecondary: React.FC<ButtonProps> = styled(ButtonBase)(
	({ theme }) => `
	color: ${theme.colors.buttonPrimaryBackgroundColor};
	background: none;

	&:not([aria-disabled='true']):hover {
		background-color: ${theme.colors.buttonSecondaryHoverBackgroundColor};
	}

	&:not([aria-disabled='true']):active {
    	color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
		background-color: ${theme.colors.buttonSecondaryActiveBackgroundColor};
	}

	&[aria-disabled='true'] {
		color: ${theme.colors.buttonDisabledColor};
		border-color: ${theme.colors.buttonDisabledBackgroundColor};
	}
`,
);

export default ButtonSecondary;
