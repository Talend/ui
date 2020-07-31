import React from 'react';
import { Button as ReakitButton, VisuallyHidden } from 'reakit';
import styled from 'styled-components';
import tokens from '../../tokens';
import Icon from '../Icon/Icon';

export type IconName =
	| 'arrowLeft'
	| 'caret'
	| 'cross'
	| 'check'
	| 'datagrid'
	| 'eye'
	| 'eyeSlash'
	| 'information'
	| 'link'
	| 'minus'
	| 'plus'
	| 'search'
	| 'upload'
	| 'validate'
	| 'warning';

export type ButtonProps = {
	/** The icon name of the button */
	icon?: IconName;
	/** If the button is small or not */
	small?: boolean;
	/** If the button should not display children */
	hideLabel?: boolean;

	className?: string;
	children?: any;
};

const StyledButton = styled(ReakitButton)(
	({ theme }) => `
	display: inline-flex;
	align-items: center;
	padding: ${tokens.space.none} ${tokens.space.large};
	min-height: ${tokens.sizes.large};
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.textColor};
	background: ${tokens.colors.transparent};
	border: ${tokens.borders.normal};
	border-radius: ${tokens.radii.rectRadius};
	transition: all 0.2s;
	cursor: pointer;

	&[aria-disabled='true'] {
		cursor: not-allowed;
	}
	
	svg {
		margin-left: 1rem;
		fill: currentColor;
		flex-grow: 0;
		flex-shrink: 0;
	}

	&.btn {
		.btn__icon {
			margin: 0 1rem 0 0;
			height: 1.2rem;
			
			path {
				fill: currentColor;
			}
		}

		&--small {
			padding: ${tokens.space.none} ${tokens.space.small};
			min-height: ${tokens.sizes.small};
		}
		
		&--icon {
			.btn__icon {
				margin: 0;
			}
		}
	}
`,
);

const BaseButton: React.FC<ButtonProps> = React.forwardRef(
	({ className, icon, small, hideLabel, children, ...props }: ButtonProps, ref) => (
		<StyledButton
			{...props}
			className={`
				btn ${className ? className : null} ${small ? `btn--small` : ''}  ${
				icon && hideLabel ? `btn--icon` : ''
			}
			`}
			ref={ref}
		>
			{icon && <Icon className="btn__icon" name={icon} />}
			{hideLabel ? children && <VisuallyHidden>{children}</VisuallyHidden> : children}
		</StyledButton>
	),
);

export default BaseButton;
