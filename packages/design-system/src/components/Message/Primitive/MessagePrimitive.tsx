import React, { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import tokens from '@talend/design-tokens';
import classnames from 'classnames';

import { SizedIcon } from '../../Icon';
import Link, { LinkProps } from '../../Link/Link';
import { StackHorizontal, StackVertical } from '../../Stack';
import { ButtonTertiaryPropsType } from '../../Button/variations/ButtonTertiary';
import { ButtonTertiary } from '../../Button';
import Dropdown from '../../Dropdown';
import { ButtonIcon } from '../../ButtonIcon';
import { DropdownPropsType } from '../../Dropdown/Dropdown';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';

import styles from './MessageStyles.module.scss';

export type SharedMessageCollectionProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'style' | 'children' | 'className'
> & {
	action: ButtonTertiaryPropsType<'S'>;
	additionalActions?: Omit<DropdownPropsType, 'children'>;
	description: string;
	title: string;
};

export type SharedMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> & {
	action?: ButtonTertiaryPropsType<'S'>;
	additionalActions?: Omit<DropdownPropsType, 'children'>;
	children?: ReactNode | ReactNode[];
	description: string;
	link?: LinkProps;
	title?: string;
};

export type BaseMessageProps = Omit<SharedMessageCollectionProps, 'action' | 'title'> &
	SharedMessageProps & {
		borderClassname: string;
		icon?: IconNameWithSize<'S'>;
	};

export const MessagePrimitive = forwardRef(
	(
		{
			borderClassname,
			description,
			title,
			link,
			icon,
			children,
			action,
			additionalActions,
			...props
		}: BaseMessageProps,
		ref: Ref<HTMLDivElement>,
	) => {
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

		return (
			<div
				{...props}
				role="status"
				aria-live="polite"
				className={classnames(styles.message, borderClassname)}
				ref={ref}
			>
				<StackVertical gap="XS" padding={{ top: 'S', bottom: 'S', left: 'M', right: 'M' }}>
					{title && (
						<header className={styles.message__title}>
							<StackHorizontal gap="XS" align="center">
								{icon && (
									<SizedIcon name={icon} size="S" color={tokens.coralColorNeutralIconWeak} />
								)}
								{title}
							</StackHorizontal>
						</header>
					)}
					<p className={styles.message__description}>{description}</p>
					{link && <Link {...link} />}
					{children}
					<StackHorizontal gap={0} isFullWidth align="center" justify="spaceBetween">
						{action && <ButtonTertiary {...action} />}
						{additionalActions && (
							<Dropdown {...additionalActions}>
								<ButtonIcon size="XS" icon="dots-vertical" onClick={() => {}}>
									{t('ADDITIONAL_ACTIONS', 'Additional actions')}
								</ButtonIcon>
							</Dropdown>
						)}
					</StackHorizontal>
				</StackVertical>
			</div>
		);
	},
);

MessagePrimitive.displayName = 'MessagePrimitive';
