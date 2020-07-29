import React from 'react';
import styled from 'styled-components';
import { VisuallyHidden } from 'reakit';
import ButtonBase, { ButtonProps } from '../Button';
import Icon from '../../Icon';
import tokens from '../../../tokens';

export type IconButtonProps = ButtonProps & {
	/** The icon name of the button */
	icon?: string;
};

const StyledButton = styled(ButtonBase)(
	({ theme }) => `
	padding: 0;
	min-height: unset;
	height: ${tokens.sizes.small};
	width: ${tokens.sizes.small};
	align-items: center;
	justify-content: center;
	color: ${theme.colors.buttonPrimaryBackgroundColor};
	border: 2px solid ${theme.colors.buttonPrimaryBackgroundColor};
	border-color: currentColor;
	border-radius: ${tokens.radii.circleRadius};

	&:not([aria-disabled='true']):hover {
		color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
	}

	&:not([aria-disabled='true']):active {
		color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
	}

	&[aria-disabled='true'] {
		color: ${theme.colors.buttonDisabledColor};
	}

	.btn__icon {
		margin: 0;
		height: 1.2rem;
	}
`,
);

const ButtonIcon: React.FC<IconButtonProps> = React.forwardRef(
	({ icon, children, ...props }, ref) => {
		return (
			<StyledButton {...props} ref={ref}>
				{icon && <Icon className="btn__icon" name={icon} />}
				{children && <VisuallyHidden>{children}</VisuallyHidden>}
			</StyledButton>
		);
	},
);

export default ButtonIcon;
