import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';
import ButtonSecondary from './Button.secondary';

const ButtonGhost: React.FC<ButtonProps> = styled(ButtonSecondary)`
	border-color: ${tokens.colors.transparent};
`;

export default ButtonGhost;
