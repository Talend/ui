import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import { IconName } from '@talend/icons';
import Clickable, { ClickableProps } from '../../Clickable';

import styles from './DropdownEntry.module.scss';
import { Icon } from '../../Icon/Icon';

export type DropdownButtonType = Omit<ClickableProps, 'as'> & MenuItemProps & { icon?: IconName };

const DropdownButton = forwardRef(
	({ children, icon, ...props }: DropdownButtonType, ref: Ref<HTMLButtonElement>) => {
		return (
			<MenuItem as={Clickable} {...props} className={styles.dropdownEntry} ref={ref}>
				{icon && <Icon name={icon} data-test="button.icon.before" className={styles.buttonIcon} />}
				<span className={styles.buttonContent}>{children}</span>
			</MenuItem>
		);
	},
);

export default DropdownButton;
