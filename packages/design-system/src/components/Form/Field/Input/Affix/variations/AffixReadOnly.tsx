import React, { forwardRef, Ref, HTMLAttributes } from 'react';
import { IconName } from '@talend/icons';

import { Icon } from '../../../../../Icon/Icon';
import { StackHorizontal } from '../../../../../Stack';
import VisuallyHidden from '../../../../../VisuallyHidden';

import styles from '../AffixStyles.module.scss';

type CommonAffixReadOnlyPropTypes = {
	children: string;
};

type AffixReadOnlyHideTextProps = {
	hideText?: true;
	icon: IconName;
};

type AffixReadOnlyShowTextProps = {
	hideText?: false;
	icon?: IconName;
};

export type AffixReadOnlyPropTypes = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> &
	CommonAffixReadOnlyPropTypes &
	(AffixReadOnlyHideTextProps | AffixReadOnlyShowTextProps);

const AffixReadOnly = forwardRef(
	(
		{ children, icon, hideText = false, ...rest }: AffixReadOnlyPropTypes,
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
