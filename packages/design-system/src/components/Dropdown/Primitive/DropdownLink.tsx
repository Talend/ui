import React, { forwardRef, Ref } from 'react';
import { MenuItem, MenuItemProps } from 'reakit';
import Linkable, { LinkableType } from '../../Linkable';

import styles from './DropdownEntry.module.scss';

type LinkProps = Omit<LinkableType, 'as'> & MenuItemProps;

const DropdownLink = forwardRef(
	({ children, ...props }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
		return (
			<MenuItem as={Linkable} {...props} className={styles.dropdownEntry} ref={ref}>
				{children}
			</MenuItem>
		);
	},
);

export default DropdownLink;
