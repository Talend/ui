import { cloneElement, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactElement, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { DeprecatedIconNames } from '../../types';
import { ButtonDestructive, ButtonPrimary, ButtonSecondary } from '../Button';
import { ButtonDestructivePropsType } from '../Button/variations/ButtonDestructive';
import { ButtonPrimaryPropsType } from '../Button/variations/ButtonPrimary';
import { ButtonSecondaryPropsType } from '../Button/variations/ButtonSecondary';
import { Disclosure } from '../Disclosure/Disclosure';
import { Icon } from '../Icon';
import { StackHorizontal, StackVertical } from '../Stack';
import { Dialog, DialogPropsType, useDialogState } from './Primitives/Dialog';
import { DialogBackdrop } from './Primitives/DialogBackdrop';

import styles from './Modal.module.scss';

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
	| Omit<ButtonPrimaryPropsType<'M'>, 'size'>
	| ({ destructive: true } & Omit<ButtonDestructivePropsType<'M'>, 'size'>);

export type ModalPropsType = {
	header: {
		title: ReactNode;
		description?: string;
		icon?: IconProp;
	};
	onClose?: () => void;
	disclosure?: ReactElement;
	primaryAction?: PrimaryActionPropsType;
	secondaryAction?: ButtonSecondaryPropsType<'M'>;
	preventEscaping?: boolean;
	children: ReactNode | ReactNode[];
	preventInteractiveBackdrop?: boolean;
} & DialogPropsType;

function PrimaryAction(props: PrimaryActionPropsType) {
	if (!('destructive' in props) || !props.destructive) {
		return <ButtonPrimary {...(props as ButtonPrimaryPropsType<'M'>)} />;
	}

	const { destructive, ...buttonProps } = props;

	return <ButtonDestructive {...(buttonProps as ButtonDestructivePropsType<'M'>)} />;
}

export function Modal(props: ModalPropsType): ReactElement {
	const {
		header,
		primaryAction,
		disclosure,
		onClose,
		secondaryAction,
		preventEscaping,
		children,
		preventInteractiveBackdrop,
		...rest
	} = props;
	const hasDisclosure = 'disclosure' in props;
	const { t } = useTranslation('design-system');
	const dialog = useDialogState({ visible: !hasDisclosure });

	const backdropRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const titleId = 'modal-header-text-title';

	useEffect(() => {
		dialogRef.current?.focus();
	}, [dialogRef]);

	const onCloseHandler = useMemo(
		() => (hasDisclosure ? () => dialog.hide() : () => onClose && onClose()),
		[dialog, hasDisclosure, onClose],
	);

	const onClickBackdropHandler = useCallback(
		(event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
			if (!preventEscaping && !preventInteractiveBackdrop && event.target === backdropRef.current) {
				onCloseHandler();
			}
		},
		[onCloseHandler, preventInteractiveBackdrop, preventEscaping],
	);

	const onHideDialog = useCallback(() => {
		if (!preventEscaping && !preventInteractiveBackdrop) {
			onCloseHandler();
		}
	}, [onCloseHandler, preventInteractiveBackdrop, preventEscaping]);

	return (
		<>
			{disclosure && (
				<Disclosure {...dialog}>
					{disclosureProps =>
						cloneElement(disclosure, { ...disclosureProps, onClick: dialog.show })
					}
				</Disclosure>
			)}
			<DialogBackdrop
				visible={dialog.visible}
				className={styles['modal-backdrop']}
				data-test="modal.backdrop"
				data-testid="modal.backdrop"
				onClick={onClickBackdropHandler}
				ref={backdropRef}
			>
				<Dialog
					{...rest}
					visible={dialog.visible}
					data-test="modal"
					data-testid="modal"
					className={styles.modal}
					hide={onHideDialog}
					aria-labelledby={titleId}
					ref={dialogRef}
				>
					<StackVertical gap={0}>
						<div className={styles.modal__header}>
							{header.icon && (
								<ModalIcon
									icon={header.icon}
									data-test="modal.header.icon"
									data-testid="modal.header.icon"
								/>
							)}
							<div className={styles['modal-header-text']}>
								<span
									id={titleId}
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
								{!preventEscaping && (
									<span className={styles['close-button']}>
										<ButtonSecondary
											onClick={() => onCloseHandler()}
											data-test="modal.buttons.close"
											data-testid="modal.buttons.close"
											data-feature="modal.buttons.close"
										>
											{primaryAction || secondaryAction
												? t('CANCEL', 'Cancel')
												: t('CLOSE', 'Close')}
										</ButtonSecondary>
									</span>
								)}

								{secondaryAction && (
									<ButtonSecondary
										data-test="modal.buttons.secondary"
										data-testid="modal.buttons.secondary"
										data-feature="modal.buttons.secondary"
										{...secondaryAction}
									/>
								)}

								{primaryAction && (
									<PrimaryAction
										data-testid="modal.buttons.primary"
										data-test="modal.buttons.primary"
										data-feature="modal.buttons.primary"
										{...primaryAction}
									/>
								)}
							</StackHorizontal>
						</div>
					</StackVertical>
				</Dialog>
			</DialogBackdrop>
		</>
	);
}
