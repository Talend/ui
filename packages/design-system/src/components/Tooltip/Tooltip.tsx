import { cloneElement, useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';
// example from doc
// https://codesandbox.io/s/xenodochial-grass-js3bo9?file=/src/Tooltip.tsx:937-1044
import {
	arrow,
	FloatingArrow,
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
export type Placement =
	| 'auto-start'
	| 'auto'
	| 'auto-end'
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

export type TooltipProps = PropsWithChildren<any> & {
	title?: string;
	placement?: Placement;
	id?: string;
};

// FIXME: fix styles
// FIXME: fix placement left
const Tooltip = ({ id, children, title, placement = 'top' }: TooltipProps) => {
	// const tooltipState = useTooltipState({
	// 	...rest,
	// 	animated: 250,
	// 	gutter: 15,
	// });
	const safeId = useId(id);
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const floating = useFloating({
		placement,
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			arrow({
				element: arrowRef,
			}),
			offset(4),
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
			{cloneElement(children as any, {
				ref: floating.refs.setReference,
				'aria-describedBy': safeId,
				...getReferenceProps(),
			})}
			{title && isOpen && (
				<div
					id={safeId}
					ref={floating.refs.setFloating}
					className={styles.container}
					style={floating.floatingStyles}
					{...getFloatingProps()}
				>
					<FloatingArrow ref={arrowRef} context={floating.context} />
					{title}
				</div>
			)}
		</>
	);
};

export default Tooltip;
