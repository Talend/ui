/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import type { ReactNode, MutableRefObject, RefCallback } from 'react';
import {
	arrow,
	FloatingArrow,
	FloatingPortal,
	useFloating,
	useHover,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	autoUpdate,
	flip,
	offset,
	shift,
} from '@floating-ui/react';

import { useId } from '../../useId';

import styles from './Tooltip.module.scss';
import { renderOrClone } from '../../renderOrClone';

export type Placement =
	| 'top-start'
	| 'top'
	| 'top-end'
	| 'right-start'
	| 'right'
	| 'right-end'
	| 'bottom-end'
	| 'bottom'
	| 'bottom-start'
	| 'left-end'
	| 'left'
	| 'left-start';

export type TooltipChildrenFnProps = {
	onHover?: (event: any) => void;
	onFocus?: (event: any) => void;
	onBlur?: (event: any) => void;
	'aria-describedby'?: string;
};

export type TooltipChildrenFnRef =
	| any
	| MutableRefObject<HTMLButtonElement>
	| RefCallback<HTMLButtonElement>;

export type TooltipProps = {
	title?: string;
	placement?: Placement;
	id?: string;
	children: (props: TooltipChildrenFnProps, ref: any) => ReactNode;
};

const Tooltip = ({ id, children, title, placement = 'top', ...rest }: TooltipProps) => {
	const safeId = useId(id);
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const floating = useFloating({
		placement: placement || 'top',
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			arrow({
				element: arrowRef,
			}),
			offset(10),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'start',
				padding: 5,
			}),
			shift({ padding: 4 }),
		],
		whileElementsMounted: autoUpdate,
	});
	const hover = useHover(floating.context, { move: false });
	const focus = useFocus(floating.context);
	const dismiss = useDismiss(floating.context);
	const role = useRole(floating.context, { role: 'tooltip' });
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

	return (
		<>
			{renderOrClone(children, {
				...getReferenceProps(),
				'aria-describedby': safeId,
				ref: floating.refs.setReference,
			})}
			<FloatingPortal>
				<div
					{...getFloatingProps()}
					id={safeId}
					ref={floating.refs.setFloating}
					className={styles.container}
					style={{ display: isOpen ? 'block' : 'none', ...floating.floatingStyles }}
					{...rest}
				>
					<FloatingArrow ref={arrowRef} context={floating.context} />
					{title}
				</div>
			</FloatingPortal>
		</>
	);
};

export default Tooltip;
