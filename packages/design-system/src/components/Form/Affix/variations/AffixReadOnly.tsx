import { forwardRef, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { IconNameWithSize } from '@talend/icons';

import { DeprecatedIconNames } from '../../../../types';
import { StackHorizontal } from '../../../Stack';
import VisuallyHidden from '../../../VisuallyHidden';
import { getIconWithDeprecatedSupport } from '../../../Icon/DeprecatedIconHelper';

import styles from '../AffixStyles.module.scss';

type CommonAffixReadOnlyPropsType = {
	children: string;
	isSuffix?: boolean;
};

type AffixReadOnlyHideTextProps = {
	hideText?: true;
	icon: DeprecatedIconNames | IconNameWithSize<'M'>;
};

type AffixReadOnlyShowTextProps = {
	hideText?: false;
	icon?: DeprecatedIconNames | IconNameWithSize<'M'>;
};

export type AffixReadOnlyPropsType = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> &
	CommonAffixReadOnlyPropsType &
	(AffixReadOnlyHideTextProps | AffixReadOnlyShowTextProps);

const AffixReadOnly = forwardRef(
	(
		{ children, icon, hideText = false, isSuffix = false, ...rest }: AffixReadOnlyPropsType,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<span
				ref={ref}
				{...rest}
				className={classnames(styles.affix, { [styles.affix_isSuffix]: isSuffix })}
			>
				<StackHorizontal gap="XXS" as="span" display="inline" justify="center" align="center">
					{icon && (
						<span className={styles.affix__icon}>
							{getIconWithDeprecatedSupport({ iconSrc: icon, size: 'M' })}
						</span>
					)}
					{!hideText ? children : <VisuallyHidden>{children}</VisuallyHidden>}
				</StackHorizontal>
			</span>
		);
	},
);

AffixReadOnly.displayName = 'AffixReadOnly';

export default AffixReadOnly;
