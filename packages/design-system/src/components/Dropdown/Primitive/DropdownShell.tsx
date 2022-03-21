import React, { forwardRef, Ref } from 'react';
import { MenuProps } from 'reakit';

import styles from './DropdownShell.module.scss';
import { StackVertical } from '../../Stack';

type ShellProps = MenuProps;

const DropdownShell = forwardRef(({ children, ...rest }: ShellProps, ref: Ref<HTMLDivElement>) => {
	return (
		<div {...rest} className={styles.dropDownShell} ref={ref}>
			<div className={styles.animatedZone}>
				<StackVertical gap={0} align="stretch" justify="stretch">
					{children}
				</StackVertical>
			</div>
		</div>
	);
});

export default DropdownShell;
