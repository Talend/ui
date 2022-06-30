import React, {
	AnchorHTMLAttributes,
	cloneElement,
	forwardRef,
	ReactElement,
	ReactNode,
	Ref,
	useMemo,
} from 'react';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';
import { DeprecatedIconNames } from '../../types';
import { SizedIcon } from '../Icon';

import style from './LinkableStyles.module.scss';
import { getIconWithDeprecatedSupport } from '../Icon/DeprecatedIconHelper';

export type LinkableType = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> & {
	as?: 'a' | ReactElement;
	children: ReactNode | ReactNode[];
	icon?: DeprecatedIconNames | ReactElement | IconNameWithSize<'M'>;
	hideExternalIcon?: boolean;
	isNaturallyAligned?: boolean;
	withEllipsis?: boolean;
};

export function isBlank(target: string | undefined): boolean {
	return !!target && !['_self', '_parent', '_top'].includes(target.toLowerCase());
}

const Linkable = forwardRef(
	(
		{
			as = 'a',
			isNaturallyAligned = false,
			href,
			children,
			target,
			icon,
			hideExternalIcon,
			className,
			withEllipsis,
			...rest
		}: LinkableType,
		// Ref<any>: Linkable is polymorphic. Could be any HTML element
		ref: Ref<any>,
	) => {
		const isExternal = useMemo(() => {
			if (!href) {
				return false;
			}
			return /^https?:\/\//i.test(href) && new URL(href).host !== location.host;
		}, [href]);

		const MaybeIcon =
			icon &&
			(typeof icon === 'string' ? (
				<span className={style.link__icon}>
					{getIconWithDeprecatedSupport({
						iconSrc: icon,
						size: 'M',
						['data-test']: 'link.icon.before',
					})}
				</span>
			) : (
				cloneElement(icon, {
					'data-test': 'link.icon.before',
					className: classnames(icon.props?.className, style.link__icon),
				})
			));

		const MaybeExternal = isExternal && !hideExternalIcon && (
			<span className={style.link__iconExternal}>
				<SizedIcon size="S" name="external-link" data-test="link.icon.external" />
			</span>
		);

		const Element = (
			<>
				{MaybeIcon}
				{children}
				{MaybeExternal}
			</>
		);

		if (as === 'a') {
			return (
				<a
					{...rest}
					href={href}
					ref={ref}
					target={target}
					rel={isBlank(target) ? 'noreferrer noopener' : undefined}
					className={classnames(style.linkable, className, {
						[style.naturally_aligned]: isNaturallyAligned,
						[style.with_ellipsis]: withEllipsis,
					})}
				>
					{Element}
				</a>
			);
		}

		return React.cloneElement(
			as,
			{
				...rest,
				target,
				href,
				rel: isBlank(target) ? 'noreferrer noopener' : undefined,
				className: classnames(style.linkable, className, {
					[style.naturally_aligned]: isNaturallyAligned,
					[style.with_ellipsis]: withEllipsis,
				}),
				ref,
			},
			[Element],
		);
	},
);

export default Linkable;
