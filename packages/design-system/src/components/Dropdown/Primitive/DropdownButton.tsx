import { forwardRef, Ref } from 'react';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import { Clickable, ClickableProps } from '../../Clickable';
import { SizedIcon } from '../../Icon';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';
import styles from './DropdownEntry.module.css';

/**
 * This is in fact a Menu Item
 */

export type DropdownButtonType = ClickableProps & {
	icon?: DeprecatedIconNames | IconNameWithSize<'M'>;
};

export const DropdownButton = forwardRef(
	({ children, icon, checked, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<Clickable {...props} ref={ref} role="menuitem">
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
					{checked && (
						<SizedIcon
							name="check"
							size="M"
							data-test="dropdown.menuItem.Button.checked"
							data-testid="dropdown.menuItem.Button.checked"
						/>
					)}
				</div>
			</Clickable>
		);
	},
);

DropdownButton.displayName = 'DropdownButton';
