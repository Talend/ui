import React from 'react';
import { VisuallyHidden as ReakitVisuallyHidden } from 'reakit';
import Icon, { IconName } from '../Icon/Icon';
import * as S from './Button.style';

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

const Button: React.FC<ButtonProps> = React.forwardRef(
	({ className, icon, small, hideLabel, children, ...rest }: ButtonProps, ref) => (
		<S.Button
			{...rest}
			className={`
				btn ${className ? className : null} ${small ? `btn--small` : ''}  ${
				icon && hideLabel ? `btn--icon` : ''
			}
			`}
			ref={ref}
		>
			{icon && <Icon className="btn__icon" name={icon} />}
			{hideLabel ? children && <ReakitVisuallyHidden>{children}</ReakitVisuallyHidden> : children}
		</S.Button>
	),
);

export default Button;
