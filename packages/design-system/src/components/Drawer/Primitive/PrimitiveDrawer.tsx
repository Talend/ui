import { forwardRef } from 'react';
import type { ReactNode, Ref } from 'react';

import theme from './PrimitiveDrawer.module.scss';

export type DrawerProps = {
	header?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
};

export const PrimitiveDrawer = forwardRef(
	({ header, children, footer }: DrawerProps, ref: Ref<HTMLDivElement>) => (
		<div className={theme.drawer} ref={ref}>
			{header && <div className={theme.header}>{header}</div>}
			<div className={theme.body}>{children}</div>
			{footer && <div className={theme.footer}>{footer}</div>}
		</div>
	),
);
PrimitiveDrawer.displayName = 'PrimitiveDrawer';
