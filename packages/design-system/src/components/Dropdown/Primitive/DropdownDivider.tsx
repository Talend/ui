import { forwardRef, HTMLAttributes, Ref } from 'react';

import styles from './DropdownDivider.module.css';

export type DropdownDividerType = HTMLAttributes<HTMLHRElement>;

const DropdownDivider = forwardRef((props: DropdownDividerType, ref: Ref<HTMLHRElement>) => {
	return <hr {...props} aria-orientation="horizontal" className={styles.divider} ref={ref} />;
});

DropdownDivider.displayName = 'DropdownDivider';

export default DropdownDivider;
