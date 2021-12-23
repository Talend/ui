import React from 'react';
import { useDialogState, DialogProps, Dialog as ReakitDialog } from 'reakit';
import { useTranslation } from 'react-i18next';

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
		const { t } = useTranslation();

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
					<ReakitDialog {...dialog} {...props} as={S.Dialog} ref={ref}>
						<S.DialogHeading>
							{icon && <Icon name={icon} />}
							<div>
								{title && <h1>{title}</h1>}
								{subtitle && <h2>{subtitle}</h2>}
							</div>
						</S.DialogHeading>
						{children}
						<S.DialogButtons>
							<Button.Secondary onClick={onCloseHandler}>{t('MODAL_CANCEL', 'Cancel')}</Button.Secondary>
							<Button.Primary onClick={onValidateHandler}>{t('MODAL_VALIDATE	', 'Validate')}</Button.Primary>
						</S.DialogButtons>
					</ReakitDialog>
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
	({ children, ...rest }: React.PropsWithChildren<any>, ref) => (
		<S.DialogBackdrop {...rest}>
			<S.Dialog {...rest} as={ReakitDialog} ref={ref}>
				{children}
			</S.Dialog>
		</S.DialogBackdrop>
	),
);

export default Modal;
