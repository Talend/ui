import React, { forwardRef, Ref } from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';

import { Icon } from '../../../../Icon/Icon';
import Tooltip from '../../../../Tooltip';
import { StackHorizontal } from '../../../../Stack';

import styles from '../AffixStyles.module.scss';
import Clickable, { ClickableProps } from '../../../../Clickable';

type CommonAffixButtonPropsType = {
	children: string;
	isDropdown?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	isSuffix?: boolean;
};

type AffixButtonHideTextProps = {
	hideText?: true;
	icon: IconName;
};

type AffixButtonShowTextProps = {
	hideText?: false;
	icon?: IconName;
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
			isSuffix = false,
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
				className={classnames(styles.affix, styles.button, { [styles.suffix]: isSuffix })}
			>
				<StackHorizontal gap="XXS" as="span">
					{icon && (
						<span className={styles.affix__icon}>
							<Icon name={icon} />
						</span>
					)}
					{!hideText && children}
					{isDropdown && (
						<span className={styles.affix__caret}>
							<Icon name="talend-caret-down" />
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
