import React from 'react';
import styled from 'styled-components';
import ButtonSecondary from './Button.secondary';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonGhost: React.FC<ButtonProps> = styled(ButtonSecondary)`
	&,
	&:not([aria-disabled='true']):hover,
	&:not([aria-disabled='true']):active {
		border-color: ${tokens.colors.transparent};
	}
`;

export default ButtonGhost;
