import React, { forwardRef, Ref } from 'react';
import { MenuItemProps, MenuSeparator } from 'reakit';

import styles from './DropdownDivider.module.scss';

export type DropdownDividerType = MenuItemProps;

const DropdownDivider = forwardRef((props: DropdownDividerType, ref: Ref<HTMLHRElement>) => {
	return <MenuSeparator orientation="horizontal" className={styles.divider} {...props} ref={ref} />;
});

export default DropdownDivider;
