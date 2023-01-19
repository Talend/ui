import React, { forwardRef, Ref } from 'react';

import { MenuItem, MenuItemProps } from 'reakit';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import Clickable, { ClickableProps } from '../../Clickable';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './DropdownEntry.module.scss';

export type DropdownButtonType = Omit<ClickableProps, 'as'> &
	MenuItemProps & { icon?: DeprecatedIconNames | IconNameWithSize<'M'> };

const DropdownButton = forwardRef(
	({ children, icon, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem {...props} as={Clickable} className={styles.dropdownEntry} ref={ref}>
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
			</MenuItem>
		);
	},
);

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
