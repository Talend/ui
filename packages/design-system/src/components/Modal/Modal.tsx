import React, { ReactElement, ReactNode } from 'react';
import i18n from 'i18next';
import { Dialog, DialogBackdrop } from 'reakit/Dialog';
import { IconName } from '@talend/icons';

import { ButtonDestructive, ButtonPrimary, ButtonSecondary } from '../Button';
import { Icon } from '../Icon';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonPrimaryPropsType } from '../Button/variations/ButtonPrimary';
import { ButtonSecondaryPropsType } from '../Button/variations/ButtonSecondary';
import { ButtonDestructivePropsType } from '../Button/variations/ButtonDestructive';

import modalStyles from './Modal.scss';

type ModalIcon = IconName | ReactElement;

function ModalIcon(props: { icon: ModalIcon; 'data-test'?: string }): ReactElement {
	const { icon, ['data-test']: dataTest } = props;
	return (
		<div className={modalStyles['modal-icon']} data-test={dataTest}>
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
	primaryAction?: ButtonPrimaryPropsType | { destructive?: boolean & ButtonDestructivePropsType };
	secondaryAction?: ButtonSecondaryPropsType;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
};

function Modal(props: ModalPropsType): ReactElement {
	const { header, onClose, primaryAction, secondaryAction, preventEscaping, children } = props;
	const dialog = { visible: true };

	const hasAction = primaryAction || secondaryAction;
	const onCloseLabel = hasAction ? i18n.t('CLOSE', 'Close') : i18n.t('CANCEL', 'Cancel');

	return (
		<DialogBackdrop
			{...dialog}
			className={modalStyles['modal-backdrop']}
			data-test="modal.backdrop"
		>
			<Dialog
				{...dialog}
				data-test="modal"
				aria-title={header.title}
				className={modalStyles['modal']}
				hide={preventEscaping ? undefined : () => onClose()}
			>
				<StackVertical gap="L">
					<div className={modalStyles['modal__header']}>
						{header.icon && <ModalIcon icon={header.icon} data-test="modal.header.icon" />}
						<div className={modalStyles['modal-header-text']}>
							<span
								className={modalStyles['modal-header-text__title']}
								data-test="modal.header.title"
							>
								{header.title}
							</span>
							{header.description && (
								<span
									className={modalStyles['modal-header-text__description']}
									data-test="modal.header.description"
								>
									{header.description}
								</span>
							)}
						</div>
					</div>

					<div className={modalStyles['modal__content']} data-test="modal.content">
						{children}
					</div>

					<div className={modalStyles['modal__buttons']} data-test="modal.buttons">
						<StackHorizontal gap="S" justify="spaceBetween">
							<ButtonSecondary onClick={() => onClose()} data-test="modal.buttons.close">
								{onCloseLabel}
							</ButtonSecondary>

							{hasAction && (
								<div>
									<StackHorizontal gap="XS">
										{secondaryAction && (
											<ButtonSecondary
												{...secondaryAction}
												data-test="modal.buttons.secondary-action"
											/>
										)}
										{primaryAction &&
											(!primaryAction.destructive ? (
												<ButtonPrimary
													{...primaryAction}
													data-test="modal.buttons.primary-action"
												/>
											) : (
												<ButtonDestructive
													{...primaryAction}
													data-test="modal.buttons.primary-action"
												/>
											))}
									</StackHorizontal>
								</div>
							)}
						</StackHorizontal>
					</div>
				</StackVertical>
			</Dialog>
		</DialogBackdrop>
	);
}

export default Modal;
