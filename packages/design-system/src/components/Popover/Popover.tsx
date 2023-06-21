import { forwardRef, useContext, createContext, useRef } from 'react';
import type { HTMLProps, Dispatch, SetStateAction, ReactNode } from 'react';
import tokens from '@talend/design-tokens';

import {
	useMergeRefs,
	Placement,
	FloatingPortal,
	FloatingFocusManager,
	FloatingArrow,
} from '@floating-ui/react';
import { usePopover } from './usePopover';
import { Disclosure } from '../Disclosure/Disclosure';
import theme from './Popover.module.scss';

interface PopoverOptions {
	disclosure?: ReactNode;
	initialOpen?: boolean;
	placement?: Placement;
	modal?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

type ContextType =
	| (ReturnType<typeof usePopover> & {
			setLabelId: Dispatch<SetStateAction<string | undefined>>;
			setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
	  })
	| null;

const PopoverContext = createContext<ContextType>(null);

export const usePopoverContext = () => {
	const context = useContext(PopoverContext);

	if (context == null) {
		throw new Error('Popover components must be wrapped in <Popover />');
	}

	return context;
};

export const PopoverContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	function PopoverContent({ style, ...props }, propRef) {
		const arrowRef = useRef(null);
		const { context: floatingContext, ...context } = usePopoverContext();
		const ref = useMergeRefs([context.refs.setFloating, propRef]);

		if (!floatingContext.open) return null;
		let children = props.children;

		if (typeof props.children === 'function') {
			children = children({
				hide: () => context.setOpen(false),
				...context,
			});
		}

		return (
			<FloatingPortal>
				<FloatingFocusManager context={floatingContext} modal={context.modal}>
					<div
						ref={ref}
						className={theme.popover}
						style={{ ...context.floatingStyles, ...style }}
						aria-labelledby={context.labelId}
						aria-describedby={context.descriptionId}
						{...context.getFloatingProps(props)}
					>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							strokeWidth={1}
							stroke={tokens.coralColorIllustrationShadow}
							fill={tokens.coralColorNeutralBackground}
						/>
						{children}
					</div>
				</FloatingFocusManager>
			</FloatingPortal>
		);
	},
);

export function Popover({
	children,
	disclosure,
	modal = true,
	...restOptions
}: {
	children: ReactNode;
} & PopoverOptions) {
	// This can accept any props as options, e.g. `placement`,
	// or other positioning options.
	const popover = usePopover({ modal, ...restOptions });
	return (
		<PopoverContext.Provider value={popover}>
			<Disclosure popref={popover.refs.setReference} {...popover.getReferenceProps()}>
				{disclosure}
			</Disclosure>
			{popover.open && (
				<>
					<PopoverContent ref={popover.refs.setFloating}>{children}</PopoverContent>
				</>
			)}
		</PopoverContext.Provider>
	);
}
