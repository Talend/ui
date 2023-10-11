import { forwardRef } from 'react';
import type { MouseEvent, Ref } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../../types';
import { Tooltip, TooltipChildrenFnProps, TooltipChildrenFnRef } from '../../../Tooltip';
import { StackHorizontal } from '../../../Stack';
import Clickable, { ClickableProps } from '../../../Clickable';
import { getIconWithDeprecatedSupport } from '../../../Icon/DeprecatedIconHelper';
import { SizedIcon } from '../../../Icon';

import styles from '../AffixStyles.module.scss';
import { mergeRefs } from '../../../../mergeRef';

type CommonAffixButtonPropsType = {
	children: string;
	isDropdown?: boolean;
	onClick: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	isSuffix?: boolean;
};

type AffixButtonHideTextProps = {
	hideText?: true;
	icon: DeprecatedIconNames | IconNameWithSize<'M'>;
};

type AffixButtonShowTextProps = {
	hideText?: false;
	icon?: DeprecatedIconNames;
};

export type AffixButtonPropsType = Omit<ClickableProps, 'className' | 'children'> &
	CommonAffixButtonPropsType &
	(AffixButtonHideTextProps | AffixButtonShowTextProps);

const AffixButton = forwardRef<HTMLButtonElement, AffixButtonPropsType>(
	(
		{
			children,
			isDropdown = false,
			icon,
			onClick,
			hideText = false,
			isSuffix = false,
			...rest
		}: AffixButtonPropsType,
		ref: Ref<HTMLButtonElement>,
	) => {
		const element = (subProps: TooltipChildrenFnProps, subRef: TooltipChildrenFnRef) => (
			<Clickable
				{...subProps}
				type="button"
				onClick={onClick}
				ref={subRef}
				{...rest}
				className={classnames(styles.affix, styles.button, { [styles.affix_isSuffix]: isSuffix })}
			>
				<StackHorizontal gap="XXS" as="span" justify="center" align="center">
					{icon && (
						<span className={styles.affix__icon}>
							{getIconWithDeprecatedSupport({ iconSrc: icon, size: 'M' })}
						</span>
					)}
					{!hideText && children}
					{isDropdown && (
						<span className={styles.affix__caret}>
							<SizedIcon size="S" name="chevron-down" />
						</span>
					)}
				</StackHorizontal>
			</Clickable>
		);

		if (hideText) {
			return (
				<Tooltip title={children} placement="top">
					{(triggerProps: TooltipChildrenFnProps, triggerRef: TooltipChildrenFnRef) =>
						element(triggerProps, mergeRefs<HTMLButtonElement>([triggerRef, ref]))
					}
				</Tooltip>
			);
		}

		return element({}, ref);
	},
);

AffixButton.displayName = 'AffixButton';

export default AffixButton;
