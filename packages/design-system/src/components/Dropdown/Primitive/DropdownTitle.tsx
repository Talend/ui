import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';

import styles from './DropdownTitle.module.scss';

export type DropdownTitleType = MenuItemProps & { children: string };

const DropdownTitle = forwardRef(
	({ children, ...props }: DropdownTitleType, ref: Ref<HTMLHeadingElement>) => {
		return (
			<MenuItem as="h4" {...props} className={styles.dropdownTitle} ref={ref}>
				{children}
			</MenuItem>
		);
	},
);

export default DropdownTitle;
