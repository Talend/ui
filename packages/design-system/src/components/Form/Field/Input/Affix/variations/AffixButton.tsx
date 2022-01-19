import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';

import { Icon } from '../../../../../Icon/Icon';
import Tooltip from '../../../../../Tooltip';
import { StackHorizontal } from '../../../../../Stack';

import styles from '../Affix.module.scss';

type CommonAffixButtonPropTypes = {
	label: string;
	isDropdown?: boolean;
	onClick: () => void;
};

type AffixButtonHideTextProps = {
	hideText: true;
	icon: IconName;
};

type AffixButtonShowTextProps = {
	hideText: false;
	icon?: IconName;
};

export type AffixButtonPropTypes = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'className' | 'style'
> &
	CommonAffixButtonPropTypes &
	(AffixButtonHideTextProps | AffixButtonShowTextProps);

const AffixButton = forwardRef(
	(
		{ label, isDropdown = false, icon, onClick, hideText = false, ...rest }: AffixButtonPropTypes,
		ref: Ref<HTMLButtonElement>,
	) => {
		const element = (
			<button
				type="button"
				onClick={onClick}
				ref={ref}
				{...rest}
				className={classnames(styles.affix, styles.button)}
			>
				<StackHorizontal gap="XXS" as="span">
					{icon && (
						<span className={styles.affix__icon}>
							<Icon name={icon} />
						</span>
					)}
					{!hideText && label}
					{isDropdown && (
						<span className={styles.affix__caret}>
							<Icon name="talend-caret-down" />
						</span>
					)}
				</StackHorizontal>
			</button>
		);

		if (hideText) {
			return (
				<Tooltip title={label} placement="top">
					{element}
				</Tooltip>
			);
		}

		return element;
	},
);

export default AffixButton;
