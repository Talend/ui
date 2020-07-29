import styled from 'styled-components';
import { tint, shade } from 'polished';
import ButtonBase, { ButtonProps } from '../Button';
import tokens from '../../../tokens';
import React from 'react';

const ButtonPrimary: React.FC<ButtonProps> = styled(ButtonBase)`
	color: ${tokens.colors.gray0};
	background-color: ${({ theme }) => theme.colors.primaryColor};
	border-color: ${tokens.colors.transparent};

	&:not([aria-disabled='true']):hover {
		background-color: ${({ theme }) => shade(0.2, theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background-color: ${({ theme }) => shade(0.4, theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		color: ${tint(1 - tokens.opacity.disabled, tokens.colors.gray900)};
		background-color: ${tokens.colors.gray100};
		border-color: ${tokens.colors.gray100};
	}
`;

export default ButtonPrimary;
