import { useRef } from 'react';
import type { ReactNode } from 'react';
import tokens from '@talend/design-tokens';

import { Placement, FloatingArrow, FloatingPortal } from '@floating-ui/react';
import { usePopover } from './usePopover';
import { Disclosure } from '../Disclosure/Disclosure';
import theme from './Popover.module.scss';

interface PopoverOptions {
	disclosure?: ReactNode;
	initialOpen?: boolean;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	isFixed?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Popover({
	children,
	disclosure,
	modal = true,
	isFixed = false,
	...restOptions
}: {
	children: ReactNode;
} & PopoverOptions) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const arrowRef = useRef<HTMLDivElement>(null);
	const popover = usePopover({ modal, arrowRef, ...restOptions });

	let childrenRendered = children;
	if (typeof children === 'function') {
		childrenRendered = children(popover);
	}
	let content = (
		<div
			ref={popover.refs.setFloating}
			className={theme.popover}
			style={{ ...popover.floatingStyles, display: popover.open ? 'block' : 'none' }}
			aria-labelledby={popover.labelId}
			aria-describedby={popover.descriptionId}
			{...popover.getFloatingProps(restOptions)}
		>
			<FloatingArrow
				ref={arrowRef}
				context={popover.context}
				strokeWidth={1}
				stroke={tokens.coralColorIllustrationShadow}
				fill={tokens.coralColorNeutralBackground}
			/>
			{childrenRendered}
		</div>
	);
	if (isFixed) {
		content = <FloatingPortal>{content}</FloatingPortal>;
	}
	return (
		<>
			<Disclosure popref={popover.refs.setReference} {...popover.getReferenceProps()}>
				{disclosure}
			</Disclosure>
			{content}
		</>
	);
}
