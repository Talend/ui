import Modal, { useModalState, ModalDisclosure, ModalDialog } from './Modal';
import * as S from './Modal.style';

const ModalComponent = Modal as typeof Modal & {
	useDialogState: typeof useModalState;
	Disclosure: typeof ModalDisclosure;
	Dialog: typeof ModalDialog;
	Body: typeof S.Dialog;
	Heading: typeof S.DialogHeading;
	Buttons: typeof S.DialogButtons;
};

ModalComponent.useDialogState = useModalState;
ModalComponent.Disclosure = ModalDisclosure;
ModalComponent.Dialog = ModalDialog;
ModalComponent.Body = S.Dialog;
ModalComponent.Heading = S.DialogHeading;
ModalComponent.Buttons = S.DialogButtons;

export default ModalComponent;
