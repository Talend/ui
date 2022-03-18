import React, { forwardRef, Ref } from 'react';

import styles from './DropdownTitle.module.scss';

export type DropdownTitleType = { children: string };

const DropdownTitle = forwardRef(
	({ children, ...rest }: DropdownTitleType, ref: Ref<HTMLParagraphElement>) => {
		return (
			<div {...rest} className={styles.dropdownTitle} ref={ref}>
				{children}
			</div>
		);
	},
);

export default DropdownTitle;
