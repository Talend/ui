import React, { ReactElement, ReactNode, useEffect } from 'react';
import i18n from 'i18next';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';
import { IconName } from '@talend/icons';

import { ButtonDestructive, ButtonPrimary, ButtonSecondary } from '../Button';
import { Icon } from '../Icon';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonPrimaryPropsType } from '../Button/variations/ButtonPrimary';
import { ButtonSecondaryPropsType } from '../Button/variations/ButtonSecondary';
import { ButtonDestructivePropsType } from '../Button/variations/ButtonDestructive';

import styles from './Modal.scss';

type ModalIcon = IconName | ReactElement;

function ModalIcon(props: { icon: ModalIcon; 'data-test'?: string }): ReactElement {
	const { icon, ['data-test']: dataTest } = props;
	return (
		<div className={styles['modal-icon']} data-test={dataTest}>
			{typeof icon === 'string' ? <Icon name={icon} /> : icon}
		</div>
	);
}

export type ModalPropsType = {
	header: {
		title: ReactNode;
		description?: string;
		icon?: ModalIcon;
	};
	onClose: Function;
	primaryAction?: ButtonPrimaryPropsType | { destructive: true & ButtonDestructivePropsType };
	secondaryAction?: ButtonSecondaryPropsType;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
};

function Modal(props: ModalPropsType): ReactElement {
	const { header, onClose, primaryAction, secondaryAction, preventEscaping, children } = props;
	const dialog = useDialogState({ visible: true });

	const hasAction = primaryAction || secondaryAction;
	const onCloseLabel = hasAction ? i18n.t('CLOSE', 'Close') : i18n.t('CANCEL', 'Cancel');

	let primaryActionRendered;
	if (primaryAction) {
		const dataTest = 'modal.buttons.primary-action';

		if (!('destructive' in primaryAction) || !primaryAction.destructive) {
			const buttonProps = primaryAction as ButtonPrimaryPropsType;
			primaryActionRendered = <ButtonPrimary {...buttonProps} data-test={dataTest} />;
		} else {
			const { destructive, ...rest } = primaryAction;
			const buttonProps = rest as ButtonDestructivePropsType;
			primaryActionRendered = <ButtonDestructive {...buttonProps} data-test={dataTest} />;
		}
	}

	return (
		<DialogBackdrop {...dialog} className={styles['modal-backdrop']} data-test="modal.backdrop">
			<Dialog
				{...dialog}
				data-test="modal"
				aria-title={header.title}
				className={styles['modal']}
				hide={preventEscaping ? undefined : () => onClose()}
				tabIndex={0}
			>
				<StackVertical gap={0}>
					<div className={styles['modal__header']}>
						{header.icon && <ModalIcon icon={header.icon} data-test="modal.header.icon" />}
						<div className={styles['modal-header-text']}>
							<span className={styles['modal-header-text__title']} data-test="modal.header.title">
								{header.title}
							</span>
							{header.description && (
								<span
									className={styles['modal-header-text__description']}
									data-test="modal.header.description"
								>
									{header.description}
								</span>
							)}
						</div>
					</div>

					<div className={styles['modal__content']} data-test="modal.content">
						{children}
					</div>

					<div className={styles['modal__buttons']} data-test="modal.buttons">
						<StackHorizontal gap="XS" justify="end">
							<span className={styles['close-button']}>
								<ButtonSecondary onClick={() => onClose()} data-test="modal.buttons.close">
									{onCloseLabel}
								</ButtonSecondary>
							</span>

							{secondaryAction && (
								<ButtonSecondary {...secondaryAction} data-test="modal.buttons.secondary-action" />
							)}
							{primaryActionRendered}
						</StackHorizontal>
					</div>
				</StackVertical>
			</Dialog>
		</DialogBackdrop>
	);
}

export default Modal;
