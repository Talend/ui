import React, { cloneElement, forwardRef, Ref } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Clickable, { ClickableProps } from '../Clickable';
import { Icon } from '../Icon/Icon';
import { LinkComponentProps } from '../Link';

import sharedLinkableStyles from '../Linkable/LinkableStyles.module.scss';
import linkStyles from '../Link/Link.module.scss';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';

type LinkAsButtonProps = Omit<ClickableProps, 'className'> &
	Omit<LinkComponentProps, 'hideExternalIcon'>;

const LinkAsButton = forwardRef(
	(
		{ disabled, title, icon, children, ...rest }: LinkAsButtonProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

		const getTitle = () => {
			if (disabled && title) {
				return t('LINK_DISABLED_TITLE', {
					title,
					defaultValue: '{{title}} (this link is disabled)',
				});
			}
			if (disabled) {
				return t('LINK_DISABLED', 'This link is disabled');
			}
			return title;
		};

		return (
			<Clickable
				disabled={disabled}
				{...rest}
				ref={ref}
				className={classnames(linkStyles.link, {
					[linkStyles.linkDisabled]: disabled,
				})}
				title={getTitle()}
			>
				{icon &&
					(typeof icon === 'string' ? (
						<Icon className={sharedLinkableStyles.link__icon} name={icon} />
					) : (
						cloneElement(icon, {
							className: classnames(icon.props?.className, sharedLinkableStyles.link__icon),
						})
					))}
				<span className={linkStyles.link__text}>{children}</span>
			</Clickable>
		);
	},
);

export default LinkAsButton;
