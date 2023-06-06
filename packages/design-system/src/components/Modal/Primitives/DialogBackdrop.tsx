import { Portal } from './Portal';

export type DialogBackdropProps = React.HTMLAttributes<HTMLDivElement> & {};

export function DialogBackdrop(props: DialogBackdropProps) {
	const { children, ...rest } = props;

	return (
		<Portal>
			<div {...rest}>{children}</div>;
		</Portal>
	);
}
