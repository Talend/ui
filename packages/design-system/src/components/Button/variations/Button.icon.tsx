import React from 'react';
import styled, { StyledFunction } from 'styled-components';
import { IconName } from '@talend/icons';
import ButtonSecondary from './Button.secondary';
import tokens from '../../../tokens';
import { ButtonProps } from '../Button';

export type ButtonIconProps = Omit<ButtonProps, 'small'> & {
	icon: IconName | React.ReactElement;
};

const button: StyledFunction<React.FC<ButtonIconProps>> = styled(ButtonSecondary);

const ButtonIcon: React.FC<ButtonIconProps> = button.attrs({
	className: 'btn--icon',
	hideText: true,
})`
	&& {
		padding: ${tokens.space.xs};
		min-height: unset;
		border: none;
		border-radius: ${tokens.radii.circleRadius};
	}

	&,
	&:hover,
	&:active {
		--t-button-background-color: none;
	}

	.btn__icon {
		height: ${tokens.sizes.s};
		width: ${tokens.sizes.s};
	}
`;

ButtonIcon.displayName = 'Button.Icon';

export default ButtonIcon;
