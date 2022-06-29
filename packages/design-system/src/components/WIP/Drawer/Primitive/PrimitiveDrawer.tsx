import React from 'react';
import { StackVertical } from '../../../Stack';

import theme from './PrimitiveDrawer.scss';

export type DrawerProps = {
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
};

export const PrimitiveDrawer = React.forwardRef(
	({ header, children, footer }: DrawerProps, ref: React.Ref<HTMLDivElement>) => (
		<div className={theme['primitive-drawer']} ref={ref}>
			<StackVertical gap={0} align="stretch" justify="stretch">
				{header && <div className={theme['primitive-drawer__header']}>{header}</div>}
				<div className={theme['primitive-drawer__body']}>{children}</div>
				{footer && <div className={theme['primitive-drawer__footer']}>{footer}</div>}
			</StackVertical>
		</div>
	),
);

export default PrimitiveDrawer;
