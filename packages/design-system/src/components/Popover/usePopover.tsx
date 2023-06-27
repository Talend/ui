import { useState, useMemo } from 'react';
import {
	useFloating,
	arrow,
	autoUpdate,
	offset,
	flip,
	shift,
	useClick,
	useDismiss,
	useRole,
	useInteractions,
	Placement,
} from '@floating-ui/react';

const ARROW_HEIGHT = 7;
const GAP = 2;

interface PopoverOptions {
	initialOpen?: boolean;
	arrowRef: Ref<HTMLDivElement>;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function usePopover({
	initialOpen = false,
	placement = 'bottom',
	arrowRef,
	modal,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
	const [labelId, setLabelId] = useState<string | undefined>();
	const [descriptionId, setDescriptionId] = useState<string | undefined>();

	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			arrow({
				element: arrowRef,
				size: ARROW_HEIGHT,
				gap: GAP,
			}),
			offset(ARROW_HEIGHT + GAP),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'end',
				padding: 0,
			}),
			shift({ padding: 0 }),
		],
	});

	const context = data.context;

	const click = useClick(context, {
		enabled: controlledOpen == null,
	});
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
