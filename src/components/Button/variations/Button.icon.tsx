import React from 'react';
import styled from 'styled-components';
import ButtonBase from './Button.base';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonIcon: React.FC<ButtonProps> = styled(ButtonBase).attrs({
	className: 'btn--icon',
	hideText: true,
})(
	({ theme }) => `
	padding: 0;
	padding: ${tokens.space.xs};
	min-height: unset;
	align-items: center;
	justify-content: center;
	color: ${theme.colors.buttonPrimaryBackgroundColor};
	border-color: currentColor;
	border-radius: ${tokens.radii.circleRadius};

	&:hover,
	&:active {
		color: ${theme.colors.buttonPrimaryColor};
	}

	&[aria-disabled='true'] {
		color: ${theme.colors.buttonDisabledColor};
	}
`,
);

export default ButtonIcon;
