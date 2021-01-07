import React from 'react';
import { StyledProps } from 'styled-components';

import { Icon, IconName } from '../Icon/Icon';
import Loading from '../Loading';

import * as S from './Button.style';

export type ButtonProps = StyledProps<any> & {
	/** The icon name of the button */
	icon?: IconName;
	/** If the button is small or not */
	small?: boolean;
	/** If the button is loading or not */
	loading?: boolean;
	/** If the button should not display text */
	hideText?: boolean;
};

const Button: React.FC<ButtonProps> = React.forwardRef(
	({ className, icon, small, hideText, loading, children, ...rest }: ButtonProps, ref) => (
		<S.Button
			ref={ref}
			{...rest}
			className={`
				btn ${className || ''} ${icon ? 'btn--has-icon' : ''} ${hideText ? '' : 'btn--has-text'} ${
				small ? 'btn--small' : ''
			} ${loading ? 'btn--loading' : ''}
			`}
			aria-busy={!!loading}
		>
			{loading && <Loading className="btn__loading" name={icon} aria-hidden />}
			{!loading && icon && <Icon className="btn__icon" name={icon} currentColor />}
			<span className={`btn__text ${hideText ? 'btn__text--hidden' : ''}`}>{children}</span>
		</S.Button>
	),
);

export default Button;
