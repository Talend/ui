import React from 'react';
import styled from 'styled-components';
import ButtonSecondary from './Button.secondary';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonGhost: React.FC<ButtonProps> = styled(ButtonSecondary)`
	border-color: ${tokens.colors.transparent};
`;

export default ButtonGhost;
