import React, { HTMLAttributes, ReactElement, ReactNode, useEffect, useRef } from 'react';
import i18n from 'i18next';
import { Dialog, DialogBackdrop, DialogDisclosure, useDialogState } from 'reakit/Dialog';

import { DeprecatedIconNames } from '../../types';
import { ButtonDestructive, ButtonPrimary, ButtonSecondary } from '../Button';
import { Icon } from '../Icon';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonPrimaryPropsType } from '../Button/variations/ButtonPrimary';
import { ButtonSecondaryPropsType } from '../Button/variations/ButtonSecondary';
import { ButtonDestructivePropsType } from '../Button/variations/ButtonDestructive';

import styles from './Modal.scss';

type IconProp = DeprecatedIconNames | ReactElement;

function ModalIcon(props: { icon: IconProp; 'data-test'?: string }): ReactElement {
	const { icon, 'data-test': dataTest } = props;
	return (
		<div className={styles['modal-icon']} data-test={dataTest}>
			{typeof icon === 'string' ? <Icon name={icon} /> : icon}
		</div>
	);
}

type PrimaryActionPropsType =
	| ButtonPrimaryPropsType
	| ({ destructive: true } & ButtonDestructivePropsType);

export type ModalPropsType = {
	header: {
		title: ReactNode;
		description?: string;
		icon?: IconProp;
	};
	onClose?: () => void;
	disclosure?: ReactElement;
	primaryAction?: PrimaryActionPropsType;
	secondaryAction?: ButtonSecondaryPropsType;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

function PrimaryAction(props: PrimaryActionPropsType) {
	if (!('destructive' in props) || !props.destructive) {
		return <ButtonPrimary {...(props as ButtonPrimaryPropsType)} />;
	}

	const { destructive, ...buttonProps } = props;

	return <ButtonDestructive {...(buttonProps as ButtonDestructivePropsType)} />;
}

function Modal(props: ModalPropsType): ReactElement {
	const {
		header,
		primaryAction,
		disclosure,
		onClose,
		secondaryAction,
		preventEscaping,
		children,
		...rest
	} = props;
	const hasDisclosure = 'disclosure' in props;

	const dialog = useDialogState({ visible: !hasDisclosure });
	const ref = useRef(null);

	useEffect(() => {
		(ref.current as unknown as HTMLElement)?.focus();
	}, [dialog.visible]);

	const onCloseHandler = hasDisclosure
		? () => dialog.setVisible(false)
		: () => onClose && onClose();

	return (
		<>
			{disclosure && (
				<DialogDisclosure {...dialog}>
					{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
				</DialogDisclosure>
			)}
			{dialog.visible && (
				<DialogBackdrop {...dialog} className={styles['modal-backdrop']} data-test="modal.backdrop">
					<div className={styles['modal-container']}>
						<Dialog
							{...dialog}
							{...rest}
							data-test="modal"
							className={styles.modal}
							hide={preventEscaping ? undefined : () => onCloseHandler()}
							ref={ref}
						>
							<StackVertical gap={0}>
								<div className={styles.modal__header}>
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

								<div className={styles.modal__content} data-test="modal.content">
									{children}
								</div>

								<div className={styles.modal__buttons} data-test="modal.buttons">
									<StackHorizontal gap="XS" justify="end">
										<span className={styles['close-button']}>
											<ButtonSecondary
												onClick={() => onCloseHandler()}
												data-testid="modal.buttons.close"
												data-feature="modal.buttons.close"
											>
												{primaryAction || secondaryAction
													? i18n.t('CANCEL', 'Cancel')
													: i18n.t('CLOSE', 'Close')}
											</ButtonSecondary>
										</span>

										{secondaryAction && (
											<ButtonSecondary
												data-testid="modal.buttons.secondary"
												data-feature="modal.buttons.secondary"
												{...secondaryAction}
											/>
										)}

										{primaryAction && (
											<PrimaryAction
												data-testid="modal.buttons.primary"
												data-feature="modal.buttons.primary"
												{...primaryAction}
											/>
										)}
									</StackHorizontal>
								</div>
							</StackVertical>
						</Dialog>
					</div>
				</DialogBackdrop>
			)}
		</>
	);
}

export default Modal;
