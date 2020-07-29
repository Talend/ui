import styled from 'styled-components';
import { tint } from 'polished';
import ButtonBase, { ButtonProps } from '../Button';
import tokens from '../../../tokens';
import React from 'react';

const ButtonSecondary: React.FC<ButtonProps> = styled(ButtonBase)`
	color: ${({ theme }) => theme.colors.primaryColor};
	background: none;

	&:not([aria-disabled='true']):hover {
		background-color: ${({ theme }) => tint(0.9, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background-color: ${({ theme }) => tint(0.7, theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.gray900)};
		border-color: ${tokens.colors.gray100};
	}
`;

export default ButtonSecondary;
