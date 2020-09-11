import React from 'react';
import { useDialogState, DialogProps } from 'reakit/Dialog';

import Icon from '../Icon';

import * as S from './Modal.style';

export type ModalProps = DialogProps & {
	disclosure?: string;
};

const Modal: React.FC<ModalProps> = React.forwardRef(
	({ disclosure, children, icon, title, subtitle, ...props }: ModalProps, ref) => {
		const dialog = useDialogState();
		return (
			<>
				{disclosure && (
					<S.DialogDisclosure {...dialog} ref={disclosure.ref} {...disclosure.props}>
						{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
					</S.DialogDisclosure>
				)}
				<S.DialogBackdrop {...dialog}>
					<S.Dialog {...dialog} {...props}>
						<S.DialogHeading>
							{icon && <Icon name={icon} />}
							<div>
								{title && <h1>{title}</h1>}
								{subtitle && <h2>{subtitle}</h2>}
							</div>
						</S.DialogHeading>
						{children}
					</S.Dialog>
				</S.DialogBackdrop>
			</>
		);
	},
);

const useModalState = useDialogState;
const ModalDisclosure = React.forwardRef((props, ref) => (
	<S.DialogDisclosure {...props} ref={ref} />
));
const ModalDialog = ({ children, ...rest }) => (
	<S.DialogBackdrop {...rest}>
		<S.Dialog {...rest}>{children}</S.Dialog>
	</S.DialogBackdrop>
);

const ModalComponent = Modal as typeof Modal & {
	useDialogState: typeof useModalState;
	Disclosure: typeof ModalDisclosure;
	Dialog: typeof ModalDialog;
	Buttons: typeof S.DialogButtons;
};

ModalComponent.useDialogState = useModalState;
ModalComponent.Disclosure = ModalDisclosure;
ModalComponent.Dialog = ModalDialog;
ModalComponent.Buttons = S.DialogButtons;

export default ModalComponent;
