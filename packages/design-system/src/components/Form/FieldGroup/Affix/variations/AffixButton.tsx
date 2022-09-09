import React, { forwardRef, Ref } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../../../types';
import Tooltip from '../../../../Tooltip';
import { StackHorizontal } from '../../../../Stack';
import Clickable, { ClickableProps } from '../../../../Clickable';

import styles from '../AffixStyles.module.scss';
import { getIconWithDeprecatedSupport } from '../../../../Icon/DeprecatedIconHelper';
import { SizedIcon } from '../../../../Icon';

type CommonAffixButtonPropsType = {
	children: string;
	isDropdown?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

type AffixButtonHideTextProps = {
	hideText?: true;
	icon: DeprecatedIconNames | IconNameWithSize<'S'>;
};

type AffixButtonShowTextProps = {
	hideText?: false;
	icon?: DeprecatedIconNames;
};

export type AffixButtonPropsType = Omit<ClickableProps, 'className' | 'children'> &
	CommonAffixButtonPropsType &
	(AffixButtonHideTextProps | AffixButtonShowTextProps);

const AffixButton = forwardRef(
	(
		{
			children,
			isDropdown = false,
			icon,
			onClick,
			hideText = false,
			...rest
		}: AffixButtonPropsType,
		ref: Ref<HTMLButtonElement>,
	) => {
		const element = (
			<Clickable
				type="button"
				onClick={onClick}
				ref={ref}
				{...rest}
				className={classnames(styles.affix, styles.button)}
			>
				<StackHorizontal gap="XXS" as="span" justify="center" align="center">
					{icon && (
						<span className={styles.affix__icon}>
							{getIconWithDeprecatedSupport({ iconSrc: icon, size: 'S' })}
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
					{element}
				</Tooltip>
			);
		}

		return element;
	},
);

export default AffixButton;
