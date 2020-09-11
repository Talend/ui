import React from 'react';
import { useDialogState, DialogProps } from 'reakit/Dialog';

import Button from '../Button';
import Icon from '../Icon';

import * as S from './Modal.style';

export type ModalProps = DialogProps & {
	disclosure?: string;
};

const useModalState = initialState => useDialogState({ animated: true, ...initialState });

const Modal: React.FC<ModalProps> = React.forwardRef(
	(
		{ disclosure, children, icon, title, subtitle, onClose, onValidate, ...props }: ModalProps,
		ref,
	) => {
		const dialog = useModalState();

		function onCloseHandler() {
			dialog.hide();
			onClose();
		}

		function onValidateHandler() {
			onValidate();
			dialog.hide();
		}

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
						<S.DialogButtons>
							<Button.Secondary onClick={onCloseHandler}>Cancel</Button.Secondary>
							<Button.Primary onClick={onValidateHandler}>Validate</Button.Primary>
						</S.DialogButtons>
					</S.Dialog>
				</S.DialogBackdrop>
			</>
		);
	},
);

const ModalDisclosure = React.forwardRef((props, ref) => (
	<S.DialogDisclosure {...props} ref={ref} />
));

const ModalDialog = ({ children, ...rest }) => (
	<S.DialogBackdrop {...rest}>
		<S.Dialog {...rest}>{children}</S.Dialog>
	</S.DialogBackdrop>
);

const ModalComponent = Modal as typeof Modal & {
	useDialogState: typeof useDialogState;
	Disclosure: typeof ModalDisclosure;
	Dialog: typeof ModalDialog;
	Heading: typeof S.DialogHeading;
	Buttons: typeof S.DialogButtons;
};

ModalComponent.useDialogState = useModalState;
ModalComponent.Disclosure = ModalDisclosure;
ModalComponent.Dialog = ModalDialog;
ModalComponent.Heading = S.DialogHeading;
ModalComponent.Buttons = S.DialogButtons;

export default ModalComponent;
