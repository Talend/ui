import React from 'react';
import styled from 'styled-components';
import ButtonSecondary from './Button.secondary';
import { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonIcon: React.FC<ButtonProps> = styled(ButtonSecondary).attrs({
	className: 'btn--icon',
	hideText: true,
})`
	padding: ${tokens.space.xs};
	min-height: unset;
	border-radius: ${tokens.radii.circleRadius};

	&,
	&:hover,
	&:active {
		background: none;
	}
`;

export default ButtonIcon;
