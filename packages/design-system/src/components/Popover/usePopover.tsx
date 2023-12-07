import { useMemo, useState } from 'react';
import type { MutableRefObject } from 'react';

import {
	arrow,
	autoUpdate,
	flip,
	offset,
	Placement,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from '@floating-ui/react';

const ARROW_HEIGHT = 7;
const GAP = 2;

type PopoverOptions = {
	initialOpen?: boolean;
	arrowRef?: MutableRefObject<SVGSVGElement | null>;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export type PopoverTriggerProps = {
	onClick?: (event: any) => void;
	ref: any;
};

export type UsePopoverType = {
	// floating-ui types
	refs: any;
	getFloatingProps: (props?: any) => any;
	floatingStyles: any;
	context: any;
	getReferenceProps: (props?: any) => any;
	// local state
	open: boolean;
	setOpen: (open: boolean) => void;
	modal?: boolean;
	labelId?: string;
	descriptionId?: string;
	setLabelId: (id: string) => void;
	setDescriptionId: (id: string) => void;
};

export function usePopover({
	initialOpen = false,
	placement = 'bottom',
	arrowRef,
	modal,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: PopoverOptions = {}): UsePopoverType {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
	const [labelId, setLabelId] = useState<string | undefined>();
	const [descriptionId, setDescriptionId] = useState<string | undefined>();

	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;
	const middleware = [
		offset(ARROW_HEIGHT + GAP),
		flip({
			crossAxis: placement.includes('-'),
			fallbackAxisSideDirection: 'end',
			padding: 0,
		}),
		shift({ padding: 0 }),
	];
	if (arrowRef && arrowRef.current) {
		middleware.push(
			arrow({
				element: arrowRef,
			}),
		);
	}
	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware,
	});

	const context = data.context;

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);

	const interactions = useInteractions([click, dismiss, role]);

	return useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data,
			modal,
			labelId,
			descriptionId,
			setLabelId,
			setDescriptionId,
		}),
		[open, setOpen, interactions, data, modal, labelId, descriptionId],
	);
}
