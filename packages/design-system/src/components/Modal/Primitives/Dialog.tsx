import { useState, useCallback, forwardRef, Ref, KeyboardEvent } from 'react';
import { Portal } from './Portal';
import { DisclosureState } from './DialogState';

export type DialogPropsType = React.HTMLAttributes<HTMLDivElement> & {
	'aria-modal'?: boolean | 'true' | 'false';
} & DisclosureState;

function BaseDialog(props: DialogPropsType, ref: Ref<HTMLDivElement>) {
	if (!props.visible) {
		return null;
	}
	return <Portal>{props.visible && <div ref={ref} role="dialog" data-dialog {...props} />}</Portal>;
}

export const Dialog = forwardRef<HTMLDivElement, DialogPropsType>(BaseDialog);
Dialog.displayName = 'Dialog';

export function useDialogState(opts: Partial<DisclosureState>) {
	const [visible, setVisible] = useState<boolean>(opts.visible || false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	const toggle = useCallback(() => setVisible(v => !v), []);
	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Escape') {
				hide();
			}
		},
		[hide],
	);
	return { visible, show, hide, toggle, onKeyDown, setVisible };
}
