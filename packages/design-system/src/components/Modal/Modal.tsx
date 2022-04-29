import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
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
	disclosure?: Function;
	primaryAction?: ButtonPrimaryPropsType | { destructive: true & ButtonDestructivePropsType };
	secondaryAction?: ButtonSecondaryPropsType;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
};

function Modal(props: ModalPropsType): ReactElement {
	const { header, onClose, disclosure, primaryAction, secondaryAction, preventEscaping, children } =
		props;
	const dialog = useDialogState({ visible: !disclosure });
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current) {
			(ref.current as unknown as HTMLElement).focus();
		}
	}, []);

	const hasAction = primaryAction || secondaryAction;
	const onCloseLabel = hasAction ? i18n.t('CLOSE', 'Close') : i18n.t('CANCEL', 'Cancel');
	const onCloseHandler = disclosure ? () => dialog.setVisible(false) : onClose;

	let primaryActionRendered;
	if (primaryAction) {
		const dataTest = 'modal.buttons.primary';

		if (!('destructive' in primaryAction) || !primaryAction.destructive) {
			primaryActionRendered = (
				<ButtonPrimary {...(primaryAction as ButtonPrimaryPropsType)} data-test={dataTest} />
			);
		} else {
			const { destructive, ...buttonProps } = primaryAction;
			primaryActionRendered = (
				<ButtonDestructive {...(buttonProps as ButtonDestructivePropsType)} data-test={dataTest} />
			);
		}
	}

	return (
		<>
			{disclosure && disclosure(() => dialog.setVisible(true))}
			{dialog.visible && (
				<DialogBackdrop {...dialog} className={styles['modal-backdrop']} data-test="modal.backdrop">
					<Dialog
						{...dialog}
						data-test="modal"
						className={styles['modal']}
						hide={preventEscaping ? undefined : () => onCloseHandler()}
						ref={ref}
					>
						<StackVertical gap={0}>
							<div className={styles['modal__header']}>
								{header.icon && <ModalIcon icon={header.icon} data-test="modal.header.icon" />}
								<div className={styles['modal-header-text']}>
									<span
										className={styles['modal-header-text__title']}
										data-test="modal.header.title"
									>
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
										<ButtonSecondary onClick={() => onCloseHandler()} data-test="modal.buttons.close">
											{onCloseLabel}
										</ButtonSecondary>
									</span>

									{secondaryAction && (
										<ButtonSecondary {...secondaryAction} data-test="modal.buttons.secondary" />
									)}
									{primaryActionRendered}
								</StackHorizontal>
							</div>
						</StackVertical>
					</Dialog>
				</DialogBackdrop>
			)}
		</>
	);
}

export default Modal;
