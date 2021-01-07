import React from 'react';
import { useDialogState, DialogProps } from 'reakit';

import Button from '../Button';
import { Icon } from '../Icon';

import * as S from './Modal.style';

export type ModalProps = DialogProps & {
	icon?: string;
	disclosure: React.ComponentPropsWithRef<any>;
	subtitle?: string;
	onClose?: () => void;
	onValidate?: () => void;
};

const Modal = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	(
		{ disclosure, children, icon, title, subtitle, onClose, onValidate, ...props }: ModalProps,
		ref,
	) => {
		const dialog = useDialogState({ animated: true });

		function onCloseHandler() {
			dialog.hide();
			if (onClose) {
				onClose();
			}
		}

		function onValidateHandler() {
			if (onValidate) {
				onValidate();
			}
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

export const useModalState = useDialogState;

export const ModalDisclosure = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	(props, ref) => <S.DialogDisclosure ref={ref} {...props} />,
);

export const ModalDialog = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	({ children, ...rest }, ref) => (
		<S.DialogBackdrop {...rest}>
			<S.Dialog ref={ref} {...rest}>
				{children}
			</S.Dialog>
		</S.DialogBackdrop>
	),
);

export default Modal;
