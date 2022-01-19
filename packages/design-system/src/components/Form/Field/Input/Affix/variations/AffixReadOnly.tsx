import React, { forwardRef, Ref, HTMLAttributes } from 'react';
import { IconName } from '@talend/icons';

import { Icon } from '../../../../../Icon/Icon';
import { StackHorizontal } from '../../../../../Stack';
import VisuallyHidden from '../../../../../VisuallyHidden';

import styles from '../Affix.module.scss';

type CommonAffixReadOnlyPropTypes = {
	label: string;
};

type AffixReadOnlyHideTextProps = {
	hideText: true;
	icon: IconName;
};

type AffixReadOnlyShowTextProps = {
	hideText: false;
	icon?: IconName;
};

export type AffixReadOnlyPropTypes = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> &
	CommonAffixReadOnlyPropTypes &
	(AffixReadOnlyHideTextProps | AffixReadOnlyShowTextProps);

const AffixReadOnly = forwardRef(
	(
		{ label, icon, hideText = false, ...rest }: AffixReadOnlyPropTypes,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<span ref={ref} {...rest}>
				<StackHorizontal gap="XXS" as="span">
					{icon && (
						<span className={styles.affix__icon}>
							<Icon icon={icon} />
						</span>
					)}
					{!hideText ? label : <VisuallyHidden>{label}</VisuallyHidden>}
				</StackHorizontal>
			</span>
		);
	},
);

export default AffixReadOnly;
