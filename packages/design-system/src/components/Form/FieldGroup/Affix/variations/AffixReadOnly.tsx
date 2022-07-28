import React, { forwardRef, Ref, HTMLAttributes } from 'react';

import { DeprecatedIconNames } from '../../../../../types';
import { Icon } from '../../../../Icon/Icon';
import { StackHorizontal } from '../../../../Stack';
import VisuallyHidden from '../../../../VisuallyHidden';

import styles from '../AffixStyles.module.scss';

type CommonAffixReadOnlyPropsType = {
	children: string;
};

type AffixReadOnlyHideTextProps = {
	hideText?: true;
	icon: DeprecatedIconNames;
};

type AffixReadOnlyShowTextProps = {
	hideText?: false;
	icon?: DeprecatedIconNames;
};

export type AffixReadOnlyPropsType = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> &
	CommonAffixReadOnlyPropsType &
	(AffixReadOnlyHideTextProps | AffixReadOnlyShowTextProps);

const AffixReadOnly = forwardRef(
	(
		{ children, icon, hideText = false, ...rest }: AffixReadOnlyPropsType,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<span ref={ref} {...rest} className={styles.affix}>
				<StackHorizontal gap="XXS" as="span" display="inline" justify="center" align="center">
					{icon && (
						<span className={styles.affix__icon}>
							<Icon name={icon} />
						</span>
					)}
					{!hideText ? children : <VisuallyHidden>{children}</VisuallyHidden>}
				</StackHorizontal>
			</span>
		);
	},
);

export default AffixReadOnly;
