import { DialogState } from './DialogState';
import { Portal } from './Portal';

export type DialogBackdropProps = React.HTMLAttributes<HTMLDivElement> & DialogState;

export function DialogBackdrop(props: DialogBackdropProps) {
	const { children, visible, ...rest } = props;
	if (!visible) {
		return null;
	}
	return (
		<Portal>
			<div {...rest}>{children}</div>;
		</Portal>
	);
}
