import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './DropdownShell.module.scss';
import { StackVertical } from '../../Stack';

type ShellProps = HTMLAttributes<HTMLDivElement> & {
	onClick: () => void;
	children: ReactNode;
};

const DropdownShell = forwardRef<HTMLDivElement, ShellProps>(
	({ children, onClick, ...rest }, ref) => {
		return (
			<div
				role="menu"
				aria-orientation="vertical"
				data-test="dropdown.menu"
				data-testid="dropdown.menu"
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
	},
);

DropdownShell.displayName = 'DropdownShell';

export default DropdownShell;
