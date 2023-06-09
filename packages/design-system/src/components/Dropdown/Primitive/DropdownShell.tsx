import { forwardRef, Ref, HTMLAttributes } from 'react';
import styles from './DropdownShell.module.scss';
import { StackVertical } from '../../Stack';

type ShellProps = HTMLAttributes<HTMLDivElement>;

const DropdownShell = forwardRef(({ children, ...rest }: ShellProps, ref: Ref<HTMLDivElement>) => {
	return (
		<div
			role="menu"
			aria-orientation="vertical"
			{...rest}
			className={styles.dropdownShell}
			ref={ref}
		>
			<div className={styles.animatedZone}>
				<StackVertical gap={0} align="stretch" justify="stretch">
					{children}
				</StackVertical>
			</div>
		</div>
	);
});

DropdownShell.displayName = 'DropdownShell';

export default DropdownShell;
