import React from 'react';
import { StackVertical } from '../../Stack';

import theme from './Drawer.scss';

export type DrawerProps = {
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
};

// eslint-disable-next-line react/display-name
export const Drawer = React.forwardRef(
	({ header, children, footer }: DrawerProps, ref: React.Ref<HTMLDivElement>) => (
		<div className={theme.drawer} ref={ref}>
			<StackVertical gap={0} align="stretch" justify="stretch">
				{header && <div className={theme.drawer__header}>{header}</div>}
				<div className={theme.drawer__body}>{children}</div>
				{footer && <div className={theme.drawer__footer}>{footer}</div>}
			</StackVertical>
		</div>
	),
);

export default Drawer;
