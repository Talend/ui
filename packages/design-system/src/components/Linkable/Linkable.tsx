import React, {
	forwardRef,
	Ref,
	ReactElement,
	ReactNodeArray,
	ReactNode,
	AnchorHTMLAttributes,
	cloneElement,
	useMemo,
} from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';
import { Icon } from '../Icon/Icon';
import style from './LinkableStyles.module.scss';

export type LinkableType = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> & {
	as?: 'a' | ReactElement;
	children: ReactNode | ReactNodeArray;
	icon?: IconName | ReactElement;
	hideExternalIcon?: boolean;
};

export function isBlank(target: string | undefined): boolean {
	return !!target && !['_self', '_parent', '_top'].includes(target.toLowerCase());
}

const Linkable = forwardRef(
	(
		{ as = 'a', href, children, target, icon, hideExternalIcon, className, ...rest }: LinkableType,
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
				<Icon className={style.link__icon} name={icon} data-test="link.icon.before" />
			) : (
				cloneElement(icon, {
					'data-test': 'link.icon.before',
					className: classnames(icon.props?.className, style.link__icon),
				})
			));

		const MaybeExternal = isExternal && !hideExternalIcon && (
			<Icon
				className={style.link__iconExternal}
				data-test="link.icon.external"
				name="talend-link"
			/>
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
					ref={ref}
					href={href}
					target={target}
					rel={isBlank(target) ? 'noreferrer noopener' : undefined}
					className={classnames(style.linkable, className)}
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
				className: classnames(style.linkable, className),
				ref,
			},
			[Element],
		);
	},
);

export default Linkable;
