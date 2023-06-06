import { useState, useCallback } from 'react';
import { Portal } from './Portal';
import { DisclosureState } from './DialogState';

export type DialogPropsType = React.HTMLAttributes<HTMLDivElement> & {
	'aria-modal'?: boolean;
} & DisclosureState;

export function Dialog(props: DialogPropsType) {
	if (!props.visible) {
		return null;
	}
	return <Portal>{props.visible && <div role="dialog" data-dialog {...props} />}</Portal>;
}

export function useDialogState(opts: Partial<DisclosureState>) {
	const [visible, setVisible] = useState<boolean>(opts.visible || false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	const toggle = useCallback(() => setVisible(v => !v), []);
	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				hide();
			}
		},
		[hide],
	);
	return { visible, show, hide, toggle, onKeyDown, setVisible };
}
