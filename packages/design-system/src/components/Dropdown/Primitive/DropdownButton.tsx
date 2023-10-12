import { forwardRef, Ref } from 'react';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import Clickable, { ClickableProps } from '../../Clickable';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './DropdownEntry.module.scss';

export type DropdownButtonType = ClickableProps & /*MenuItemProps &*/ {
	icon?: DeprecatedIconNames | IconNameWithSize<'M'>;
};

export const DropdownButton = forwardRef(
	({ children, icon, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<Clickable {...props} ref={ref}>
				<div className={styles.dropdownEntry}>
					{icon && (
						<span className={styles.buttonIcon}>
							{getIconWithDeprecatedSupport({
								iconSrc: icon,
								size: 'M',
								['data-test']: 'button.icon.before',
							})}
						</span>
					)}
					<span className={styles.buttonContent}>{children}</span>
				</div>
			</Clickable>
		);
	},
);

DropdownButton.displayName = 'DropdownButton';
