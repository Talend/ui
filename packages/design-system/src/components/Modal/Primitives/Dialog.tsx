/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useCallback, forwardRef } from 'react';
import type { Ref, KeyboardEvent } from 'react';
import { DialogState, DialogAction } from './DialogState';

type A11yDialogPropsType = {
	onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export type DialogPropsType = React.HTMLAttributes<HTMLDivElement> & {
	'aria-modal'?: boolean | 'true' | 'false';
} & Partial<DialogState> &
	Partial<DialogAction> &
	A11yDialogPropsType;

function BaseDialog(props: DialogPropsType, ref: Ref<HTMLDivElement>) {
	const { hide, visible, ...rest } = props;
	if (!visible) {
		return null;
	}
	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (hide && event.key === 'Escape') {
			hide();
		}
	};
	return (
		<div
			ref={ref}
			aria-modal="true"
			tabIndex={-1}
			role="dialog"
			data-dialog
			{...rest}
			onKeyDown={onKeyDown}
		/>
	);
}

export const Dialog = forwardRef(BaseDialog);
Dialog.displayName = 'Dialog';

export function useDialogState(opts: Partial<DialogState>): DialogState & DialogAction {
	const [visible, setVisible] = useState<boolean>(opts.visible || false);
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => setVisible(false), []);
	const toggle = useCallback(() => setVisible(v => !v), []);
	return { visible, show, hide, toggle };
}
