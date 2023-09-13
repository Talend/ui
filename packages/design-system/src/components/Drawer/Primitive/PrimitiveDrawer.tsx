import { forwardRef } from 'react';
import type { Ref, ReactNode } from 'react';
import { StackVertical } from '../../../Stack';

import theme from './PrimitiveDrawer.module.scss';

export type DrawerProps = {
	header?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
};

export const PrimitiveDrawer = forwardRef(
	({ header, children, footer }: DrawerProps, ref: Ref<HTMLDivElement>) => (
		<div className={theme['primitive-drawer']} ref={ref}>
			<StackVertical gap={0} align="stretch" justify="stretch">
				{header && <div className={theme['primitive-drawer__header']}>{header}</div>}
				<div className={theme['primitive-drawer__body']}>{children}</div>
				{footer && <div className={theme['primitive-drawer__footer']}>{footer}</div>}
			</StackVertical>
		</div>
	),
);
PrimitiveDrawer.displayName = 'PrimitiveDrawer';
