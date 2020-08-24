import React from 'react';
import { useDialogState } from 'reakit/Dialog';

import * as S from './Modal.style';

const Modal = React.forwardRef(({ disclosure, ...props }, ref) => {
	const dialog = useDialogState();
	return (
		<>
			{disclosure && (
				<S.DialogDisclosure {...dialog} ref={ref} {...disclosure.props}>
					{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
				</S.DialogDisclosure>
			)}
			<S.DialogBackdrop {...dialog}>
				<S.Dialog {...dialog} {...props} />
			</S.DialogBackdrop>
		</>
	);
});

Modal.useDialogState = useDialogState;
Modal.Disclosure = React.forwardRef((props, ref) => <S.DialogDisclosure {...props} ref={ref} />);
Modal.Dialog = ({ children, ...rest }) => (
	<S.DialogBackdrop {...rest}>
		<S.Dialog {...rest}>{children}</S.Dialog>
	</S.DialogBackdrop>
);

export default Modal;
