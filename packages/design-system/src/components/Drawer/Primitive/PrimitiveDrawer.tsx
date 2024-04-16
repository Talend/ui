import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';

import { StackVertical } from '../../Stack';
import theme from './PrimitiveDrawer.module.css';

export type DrawerProps = {
	header?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
};

export const PrimitiveDrawer = forwardRef(
	({ header, children, footer }: DrawerProps, ref: Ref<HTMLDivElement>) => (
		<div className={theme.drawer} ref={ref}>
			<StackVertical gap={0} align="stretch" justify="stretch">
				{header && <div className={theme.header}>{header}</div>}
				<div className={theme.body}>{children}</div>
				{footer && <div className={theme.footer}>{footer}</div>}
			</StackVertical>
		</div>
	),
);
PrimitiveDrawer.displayName = 'PrimitiveDrawer';
