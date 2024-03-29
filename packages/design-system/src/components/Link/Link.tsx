import { forwardRef, ReactElement, Ref, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { DeprecatedIconNames } from '../../types';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import { Linkable, LinkableType, isBlank as targetCheck } from '../Linkable';

import style from './Link.module.scss';

export type LinkComponentProps = {
	/** The icon to display before */
	icon?: DeprecatedIconNames | ReactElement;
	/** if the link is disabled */
	disabled?: boolean;
};

export type LinkProps = Omit<LinkableType, 'className'> & LinkComponentProps;

const Link = forwardRef(
	(
		{ children, disabled, href, target, title, ...rest }: LinkProps,
		ref: Ref<HTMLAnchorElement>,
	) => {
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const isBlank: boolean = useMemo(() => targetCheck(target), [target]);

		const getTitle = useCallback(() => {
			if (disabled && title) {
				return t('LINK_DISABLED_TITLE', {
					title,
					defaultValue: '{{title}} (this link is disabled)',
				});
			}
			if (disabled) {
				return t('LINK_DISABLED', {
					defaultValue: 'This link is disabled',
				});
			}
			if (isBlank && title) {
				return t('LINK_EXTERNAL_TITLE', {
					title,
					defaultValue: '{{title}} (open in a new tab)',
				});
			}
			if (isBlank) {
				return t('LINK_EXTERNAL', {
					defaultValue: 'Open in a new tab',
				});
			}
			return title;
		}, [disabled, title, isBlank, t]);

		return (
			<Linkable
				target={target}
				{...rest}
				href={!disabled ? href : undefined}
				className={classNames(style.link, { [style.linkDisabled]: disabled })}
				title={getTitle()}
				aria-disabled={disabled}
				ref={ref}
			>
				<span className={style.link__text}>{children}</span>
			</Linkable>
		);
	},
);
Link.displayName = 'Link';
export default Link;
