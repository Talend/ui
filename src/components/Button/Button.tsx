import React from 'react';
import { StyledProps } from 'styled-components';
import { IconName } from '@talend/icons';

import { Icon, IconProps } from '../Icon/Icon';
import Loading from '../Loading';

import * as S from './Button.style';

export type ButtonProps = StyledProps<any> & {
	/** The icon of the button */
	icon?: IconName | React.ReactElement;
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
			{loading && <Loading className="btn__loading btn__icon" name={icon} aria-hidden />}
			{!loading &&
				icon &&
				(typeof icon === 'string' ? (
					<Icon className="btn__icon" name={icon} />
				) : (
					React.cloneElement(icon, {
						className: `${icon.props.className} btn__icon`,
					})
				))}
			<span className={`btn__text ${hideText ? 'btn__text--hidden' : ''}`}>{children}</span>
		</S.Button>
	),
);

export default Button;
