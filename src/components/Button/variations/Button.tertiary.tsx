import React from 'react';
import styled from 'styled-components';
import ButtonSecondary from './Button.secondary';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonTertiary: React.FC<ButtonProps> = styled(ButtonSecondary).attrs({
	className: 'btn--tertiary',
})`
	&,
	&:hover,
	&:active {
		--t-button-border-color: ${tokens.colors?.transparent};
	}
`;

export default ButtonTertiary;
