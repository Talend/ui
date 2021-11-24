import React from 'react';
import { IconName } from '@talend/icons';
import { ClickableProps } from 'reakit';

import { Icon } from '../Icon/Icon';
import Loading from '../Loading';
import Tooltip, { TooltipPlacement } from '../Tooltip';

import * as S from './Button.style';

type BaseProps = {
	/** The icon of the button */
	icon?: IconName | React.ReactElement;
	/** If the button is small or not */
	small?: boolean;
	/** If the button is loading or not */
	loading?: boolean;
	/** If the button should not display text */
	hideText?: boolean;
	/** All buttons must have contents */
	children: React.ReactNode | React.ReactNodeArray;
	/** Use these if the button should be an anchor or router link */
	as?: React.ElementType;
	/** When hideText is set, a tooltip appears. Use this if you want to customize its position */
	tooltipPlacement?: TooltipPlacement;
	href?: string;
	target?: string;
};

export type ButtonProps = ClickableProps & BaseProps;

const Button = React.forwardRef(
	(
		{ className, icon, small, hideText, loading, children, tooltipPlacement, ...rest }: ButtonProps,
		ref: React.Ref<any>,
	) => {
		const button = (
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
							className: `${icon.props?.className} btn__icon`,
						})
					))}
				<span className={`btn__text ${hideText ? 'btn__text--hidden' : ''}`}>{children}</span>
			</S.Button>
		);

		return hideText ? (
			<Tooltip title={children} placement={tooltipPlacement}>
				{button}
			</Tooltip>
		) : (
			button
		);
	},
);

Button.displayName = 'Button';

export default Button;
