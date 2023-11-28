import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';

import tokens from '@talend/design-tokens';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { ButtonTertiary } from '../../Button';
import { ButtonTertiaryPropsType } from '../../Button/variations/ButtonTertiary';
import { ButtonIcon } from '../../ButtonIcon';
import type { ButtonIconType } from '../../ButtonIcon/variations/ButtonIcon';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { Dropdown, DropdownPropsType } from '../../Dropdown';
import { SizedIcon } from '../../Icon';
import Link, { LinkProps } from '../../Link/Link';
import { StackHorizontal, StackVertical } from '../../Stack';

import styles from './MessageStyles.module.scss';

type SharedMessageWithActionsPropsType = {
	additionalIconAction?: ButtonIconType<'XS'>;
	additionalDropdownActions?: never;
};

type SharedMessageWithActionPropsType = {
	additionalIconAction?: never;
	additionalDropdownActions?: Omit<DropdownPropsType, 'children'>;
};

export type SharedMessageCollectionProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	'style' | 'children' | 'className'
> & {
	action: ButtonTertiaryPropsType<'S'>;
	additionalIconAction?: ButtonIconType<'XS'>;
	additionalDropdownActions?: Omit<DropdownPropsType, 'children'>;
	description: string | ReactElement | string[] | ReactElement[];
	title: string;
} & (SharedMessageWithActionPropsType | SharedMessageWithActionsPropsType);

export type SharedMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'className'> & {
	action?: ButtonTertiaryPropsType<'S'>;
	additionalIconAction?: ButtonIconType<'XS'>;
	additionalDropdownActions?: Omit<DropdownPropsType, 'children'>;
	children?: ReactNode | ReactNode[];
	description: string | ReactElement | string[] | ReactElement[];
	link?: LinkProps;
	title?: string;
	titleInfo?: string;
} & (SharedMessageWithActionPropsType | SharedMessageWithActionsPropsType);

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
			titleInfo,
			link,
			icon,
			children,
			action,
			additionalIconAction,
			additionalDropdownActions,
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
					{title || titleInfo ? (
						<header className={styles.message__title}>
							<StackHorizontal gap="XS" align="center" isFullWidth>
								{icon && (
									<SizedIcon name={icon} size="S" color={tokens.coralColorNeutralIconWeak} />
								)}
								{title}
								{titleInfo ? <div className={styles.message__title__info}>{titleInfo}</div> : null}
							</StackHorizontal>
						</header>
					) : null}
					<p className={styles.message__description}>{description}</p>
					{link && <Link {...link} />}
					{children}
					<StackHorizontal gap={0} isFullWidth align="center" justify="spaceBetween">
						{action && <ButtonTertiary {...action} />}
						{additionalIconAction && (
							<div className={styles.message__actions}>
								<ButtonIcon {...additionalIconAction} size="XS" />
							</div>
						)}
						{additionalDropdownActions && (
							<div className={styles.message__actions}>
								<Dropdown {...additionalDropdownActions}>
									<ButtonIcon size="XS" icon="dots-vertical" onClick={() => {}}>
										{t('ADDITIONAL_ACTIONS', 'Additional actions')}
									</ButtonIcon>
								</Dropdown>
							</div>
						)}
					</StackHorizontal>
				</StackVertical>
			</div>
		);
	},
);

MessagePrimitive.displayName = 'MessagePrimitive';
