import { cloneElement, forwardRef, useEffect, useState } from 'react';
import type {
	ChangeEvent,
	ElementType,
	FormEvent,
	HTMLAttributes,
	MouseEvent,
	ReactElement,
	Ref,
	KeyboardEvent as RKeyboardEvent,
} from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import { DataAttributes } from 'src/types';

import { getDataAttrFromProps } from '@talend/utils';

import { useControl } from '../../../useControl';
import { useId } from '../../../useId';
import { ButtonIcon } from '../../ButtonIcon';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { Form } from '../../Form';
import { StackHorizontal } from '../../Stack';

import styles from './InlineEditingPrimitive.module.scss';

type ErrorInEditing =
	| {
			hasError: true;
			description: string;
	  }
	| {
			hasError?: boolean;
			description?: string;
	  };

export type OnEditEvent =
	| MouseEvent<HTMLButtonElement>
	| KeyboardEvent
	| FormEvent<HTMLFormElement>
	| RKeyboardEvent;

export type InlineEditingPrimitiveProps = {
	loading?: boolean;
	onCancel?: () => void;
	onToggle?: (isEditionMode: boolean) => void;
	label: string;
	required?: boolean;
	maxLength?: number;
	placeholder: string;
	ariaLabel?: string;
	renderValueAs?: ElementType | ReactElement;
	mode: 'single' | 'multi';

	/**
	 * (Optional) Initial value displayed in component.
	 * To set to display initial value while use this component as uncontrolled one.
	 */
	defaultValue?: string;

	/**
	 * (Optional) In uncontrolled way, listen value update.
	 * @param event change event
	 * @param newValue new value set in
	 */
	onEdit?: (event: OnEditEvent, newValue: string) => void;

	/**
	 * (Optional) Value displayed in component.
	 * To set to use component as controlled one.
	 */
	value?: string;

	/**
	 * (Optional) In controlled way, handle value update.
	 * It must be set to use this component as controlled component.
	 * @param newValue new value filled
	 */
	onChangeValue?: (newValue: string) => void;

	/**
	 * (Optional) Default value to set edition mode.
	 */
	isEditMode?: boolean;

	/**
	 * (Optional) In controlled way, value to set edition mode.
	 */
	isEditing?: boolean;

	/**
	 * (Optional) In controlled way, handler to update edition mode.
	 */
	onChangeEditing?: (isEditing: boolean) => void;
} & ErrorInEditing &
	Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'> &
	Partial<DataAttributes>;

const InlineEditingPrimitive = forwardRef(
	(props: InlineEditingPrimitiveProps, ref: Ref<HTMLDivElement>) => {
		const {
			loading,
			ariaLabel,
			mode,
			onCancel = () => {},
			onToggle = () => {},
			required = false,
			maxLength,
			label,
			hasError,
			description,
			placeholder,
			renderValueAs,
			defaultValue,
			onEdit = () => {},
			value,
			onChangeValue,
			'data-testid': dataTestId,
			'data-test': dataTest,
			...rest
		} = props;

		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

		const editionModeControl = useControl<boolean>(props, {
			onChangeKey: 'onChangeEditing',
			valueKey: 'isEditing',
			defaultValueKey: 'isEditMode',
			defaultValue: false,
		});

		const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
		const inlineEditingId = useId(rest.id, 'inline-edit-');

		// Displayed content depends on current mode
		// Controlled mode - display value prop
		// Uncontrolled mode - display internal value

		// eslint-disable-next-line react-hooks/exhaustive-deps
		const getValue = () => (onChangeValue ? value : internalValue);

		const toggleEditionMode = (isEditionMode: boolean) => {
			editionModeControl.onChange(isEditionMode);
			onToggle(isEditionMode);
		};

		// Errors should set InlineEditing into editing mode
		useEffect(() => {
			if (hasError) {
				toggleEditionMode(hasError);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [hasError]);

		const handleSubmit = (event: OnEditEvent) => {
			event.stopPropagation();

			if (onEdit) {
				onEdit(event, getValue() || '');
			}

			if (!hasError) {
				toggleEditionMode(false);
			}
		};

		const handleCancel = () => {
			if (editionModeControl.value) {
				// Uncontrolled mode - set to default value
				setInternalValue(defaultValue);
			}
			toggleEditionMode(false);
			onCancel();
		};

		function ValueComponent() {
			const Default = mode === 'multi' ? 'p' : 'span';
			const sharedProps = {
				'data-placeholder': placeholder,
				'aria-hidden': getValue() === undefined,
				className: classnames(styles.inlineEditor__content__value, {
					[styles.inlineEditor__content__value_multiline]: mode === 'multi',
				}),
			};

			if (renderValueAs && typeof renderValueAs === 'object') {
				return cloneElement(renderValueAs as unknown as ReactElement, { ...sharedProps }, [
					getValue(),
				]);
			}

			if (renderValueAs) {
				const Custom = renderValueAs;
				return <Custom {...sharedProps}>{getValue()}</Custom>;
			}

			return <Default {...sharedProps}>{getValue()}</Default>;
		}

		const sharedInputProps = {
			'data-test': `${dataTest ? `${dataTest}.` : ''}inlineediting.${
				mode === 'multi' ? 'textarea' : 'input'
			}`,
			'data-testid': `${dataTestId ? `${dataTestId}.` : ''}inlineediting.${
				mode === 'multi' ? 'textarea' : 'input'
			}`,
			hideLabel: true,
			hasError,
			description,
			label,
			name: label.replace(/\s/g, ''),
			fieldId: inlineEditingId,
			required,
			maxLength,
			placeholder,
			onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
				if (onChangeValue) {
					onChangeValue(event.target.value);
				} else {
					setInternalValue(event.target.value);
				}
			},
			// Keyboard shortcuts
			onKeyDown: (event: RKeyboardEvent) => {
				if (event.key === 'Enter' && mode !== 'multi') {
					// Enter
					handleSubmit(event);
				}
				if (event.key === 'Escape' || event.key === 'Esc') {
					handleCancel();
				}
			},
		};
		return (
			<div
				{...rest}
				data-test={`${dataTest ? `${dataTest}.` : ''}inlineediting`}
				data-testid={`${dataTestId ? `${dataTestId}.` : ''}inlineediting`}
				className={styles.inlineEditor}
				ref={ref}
			>
				{editionModeControl.value ? (
					<>
						<div className={styles.inlineEditor__editor}>
							{mode === 'multi' && (
								<Form.Textarea {...sharedInputProps}>{getValue()}</Form.Textarea>
							)}
							{mode === 'single' && (
								<Form.Text value={getValue()} {...sharedInputProps} data-padding-override />
							)}
							<div
								className={classnames(styles.inlineEditor__editor__actions, {
									[styles.inlineEditor__editor__actions_sticky]: mode === 'multi',
								})}
							>
								<StackHorizontal
									gap="XXS"
									padding={{ x: 'XXS', y: 0 }}
									display="inline"
									align="center"
									justify="spaceBetween"
								>
									<ButtonIcon
										onClick={handleCancel}
										icon="cross-filled"
										data-test={`${dataTest ? `${dataTest}.` : ''}inlineediting.button.cancel`}
										data-testid={`${dataTestId ? `${dataTestId}.` : ''}inlineediting.button.cancel`}
										size="XS"
									>
										{t('INLINE_EDITING_CANCEL', 'Cancel')}
									</ButtonIcon>
									<ButtonIcon
										onClick={handleSubmit}
										icon="check-filled"
										data-test={`${dataTest ? `${dataTest}.` : ''}inlineediting.button.submit`}
										data-testid={`${dataTestId ? `${dataTestId}.` : ''}inlineediting.button.submit`}
										{...getDataAttrFromProps(rest)}
										size="XS"
									>
										{t('INLINE_EDITING_SUBMIT', 'Submit')}
									</ButtonIcon>
								</StackHorizontal>
							</div>
						</div>
					</>
				) : (
					<div
						className={classnames(styles.inlineEditor__content, {
							[styles.inlineEditor__content_loading]: loading,
						})}
						onDoubleClick={() => {
							if (!loading) {
								toggleEditionMode(true);
							}
						}}
					>
						<ValueComponent />
						<span className={styles.inlineEditor__content__button}>
							<ButtonIcon
								data-test={`${dataTest ? `${dataTest}.` : ''}inlineediting.button.edit`}
								data-testid={`${dataTestId ? `${dataTestId}.` : ''}inlineediting.button.edit`}
								onClick={() => toggleEditionMode(true)}
								aria-label={ariaLabel || label}
								icon="pencil"
								disabled={loading}
								size="XS"
							>
								{t('INLINE_EDITING_EDIT', 'Edit')}
							</ButtonIcon>
						</span>
					</div>
				)}
			</div>
		);
	},
);

InlineEditingPrimitive.displayName = 'InlineEditingPrimitive';

export default InlineEditingPrimitive;
