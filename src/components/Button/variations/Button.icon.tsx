import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonIcon: React.FC<ButtonProps> = styled(Button).attrs({ hideLabel: true })(
	({ theme }) => `
	padding: 0;
	min-height: unset;
	height: ${tokens.sizes.small};
	width: ${tokens.sizes.small};
	align-items: center;
	justify-content: center;
	color: ${theme.colors.buttonPrimaryBackgroundColor};
	border-color: currentColor;
	border-radius: ${tokens.radii.circleRadius};

	&:hover {
		color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
	}

	&:active {
		color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
	}

	&[aria-disabled='true'] {
		color: ${theme.colors.buttonDisabledColor};
	}
`,
);

export default ButtonIcon;
