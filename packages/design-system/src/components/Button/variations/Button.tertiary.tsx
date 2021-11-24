import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import ButtonSecondary from './Button.secondary';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const button: StyledFunction<typeof ButtonSecondary> = styled(ButtonSecondary);

const ButtonTertiary: React.FC<ButtonProps> = button.attrs({
	className: 'btn--tertiary',
})`
	&,
	&:hover,
	&:active {
		--t-button-border-color: ${tokens.colors?.transparent};
	}
`;

ButtonTertiary.displayName = 'Button.Tertiary';

export default ButtonTertiary;
