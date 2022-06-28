import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import { DeprecatedIconNames } from '../../../types';
import Clickable, { ClickableProps } from '../../Clickable';
import { Icon } from '../../Icon/Icon';

import styles from './DropdownEntry.module.scss';

export type DropdownButtonType = Omit<ClickableProps, 'as'> &
	MenuItemProps & { icon?: DeprecatedIconNames };

const DropdownButton = forwardRef(
	({ children, icon, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem {...props} as={Clickable} className={styles.dropdownEntry} ref={ref}>
				{icon && <Icon name={icon} data-test="button.icon.before" className={styles.buttonIcon} />}
				<span className={styles.buttonContent}>{children}</span>
			</MenuItem>
		);
	},
);

export default DropdownButton;
