import React, { forwardRef, Ref } from 'react';
import { MenuProps } from 'reakit';

import styles from './DropdownShell.module.scss';

type ShellProps = MenuProps;

const DropdownShell = forwardRef(({ children, ...rest }: ShellProps, ref: Ref<HTMLDivElement>) => {
	return (
		<div className={styles.dropDownShell} {...rest} ref={ref}>
			{children}
		</div>
	);
});

export default DropdownShell;
