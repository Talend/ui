import { Ref, forwardRef } from 'react';
import { DialogState } from './DialogState';
import { Portal } from './Portal';

export type DialogBackdropProps = React.HTMLAttributes<HTMLDivElement> & DialogState;

function BaseDialogBackdrop(props: DialogBackdropProps, ref: Ref<HTMLDivElement>) {
	const { children, visible, ...rest } = props;
	if (!visible) {
		return null;
	}
	return (
		<Portal>
			<div {...rest} ref={ref}>
				{children}
			</div>
		</Portal>
	);
}

export const DialogBackdrop = forwardRef(BaseDialogBackdrop);
