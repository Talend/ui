import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import Clickable, { ClickableProps } from '../../Clickable';

import styles from './DropdownEntry.module.scss';

type LinkProps = Omit<ClickableProps, 'as'> & MenuItemProps;

const DropdownButton = forwardRef(
	({ children, ...props }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
		return (
			<MenuItem as={Clickable} {...props} className={styles.dropdownEntry} ref={ref}>
				{children}
			</MenuItem>
		);
	},
);

export default DropdownButton;
