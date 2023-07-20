import { useRef, Fragment } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import tokens from '@talend/design-tokens';

import { Placement, FloatingArrow, FloatingPortal } from '@floating-ui/react';
import { usePopover } from './usePopover';
import theme from './Popover.module.scss';
import { renderOrClone, ChildrenOrFn } from '../../renderOrClone';

type PopoverOptions = {
	popup: ReactNode | ((props: any) => ReactNode);
	initialOpen?: boolean;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	isFixed?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export type PopoverProps = {
	children: ChildrenOrFn;
} & PopoverOptions;

export function Popover({
	children,
	modal = true,
	isFixed = false,
	popup,
	...restOptions
}: PopoverProps) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const arrowRef = useRef<SVGSVGElement>(null);
	const popover = usePopover({ modal, arrowRef, ...restOptions });

	const Wrapper = isFixed ? FloatingPortal : Fragment;
	const onClick = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
	};
	const childrenProps = popover.getReferenceProps({ onClick });
	return (
		<>
			{renderOrClone(children, { ...childrenProps, ref: popover.refs.setReference })}
			<Wrapper>
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
					{typeof popup === 'function' ? popup(popover.getFloatingProps()) : popup}
				</div>
			</Wrapper>
		</>
	);
}
