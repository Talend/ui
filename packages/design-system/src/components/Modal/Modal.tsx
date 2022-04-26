import React, { ReactElement, ReactNode } from 'react';
import i18n from 'i18next';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';
import { IconName } from '@talend/icons';

import { ButtonDestructive, ButtonPrimary, ButtonSecondary } from '../Button';
import { Icon } from '../Icon';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonPrimaryPropsType } from '../Button/variations/ButtonPrimary';
import { ButtonSecondaryPropsType } from '../Button/variations/ButtonSecondary';

import modalStyles from './Modal.scss';

type ModalIcon = IconName | ReactElement;

function ModalIcon({ icon }: { icon: ModalIcon }): ReactElement {
	return (
		<div className={modalStyles['modal-icon']}>
			{typeof icon === 'string' ? <Icon name={icon} /> : icon}
		</div>
	);
}

export type ModalPropsType = {
	title: ReactNode;
	description?: string;
	icon?: ModalIcon;
	onClose: Function;
	primaryAction?: ButtonPrimaryPropsType & { destructive?: boolean };
	secondaryAction?: ButtonSecondaryPropsType;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
};

function Modal(props: ModalPropsType): ReactElement {
	const {
		title,
		icon,
		description,
		onClose,
		primaryAction,
		secondaryAction,
		preventEscaping,
		children,
	} = props;
	const dialog = { visible: true };

	const hasAction = primaryAction || secondaryAction;
	const onCloseLabel = hasAction ? i18n.t('CLOSE', 'Close') : i18n.t('CANCEL', 'Cancel');

	return (
		<DialogBackdrop {...dialog} className={modalStyles['modal-backdrop']}>
			<Dialog
				{...dialog}
				aria-title={title}
				className={modalStyles['modal']}
				hide={!preventEscaping ? () => onClose() : undefined}
			>
				<StackVertical gap="L">
					<div className={modalStyles['modal__header']}>
						{icon && <ModalIcon icon={icon} />}
						<div className={modalStyles['modal-header-text']}>
							<span className={modalStyles['modal-header-text__title']}>{title}</span>
							{description && (
								<span className={modalStyles['modal-header-text__description']}>{description}</span>
							)}
						</div>
					</div>

					<div className={modalStyles['modal__content']}>{children}</div>

					<div className={modalStyles['modal__buttons']}>
						<StackHorizontal gap="S" justify="spaceBetween">
							<ButtonSecondary onClick={() => onClose()}>{onCloseLabel}</ButtonSecondary>

							{hasAction && (
								<div>
									<StackHorizontal gap="XS">
										{secondaryAction && <ButtonSecondary {...secondaryAction} />}
										{primaryAction &&
											(!primaryAction.destructive ? (
												<ButtonPrimary tabIndex={0} {...primaryAction} />
											) : (
												<ButtonDestructive {...primaryAction} />
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
