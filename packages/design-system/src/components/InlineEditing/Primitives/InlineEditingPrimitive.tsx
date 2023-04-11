import {
	cloneElement,
	ElementType,
	forwardRef,
	HTMLAttributes,
	ReactElement,
	Ref,
	useEffect,
	useState,
} from 'react';

import * as React from 'react';
import classnames from 'classnames';
import keycode from 'keycode';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import Form from '../../Form';
import { StackHorizontal } from '../../Stack';
import { ButtonIcon } from '../../ButtonIcon';

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
	| React.MouseEvent<HTMLButtonElement>
	| KeyboardEvent
	| React.FormEvent<HTMLFormElement>
	| React.KeyboardEvent;

export type InlineEditingPrimitiveProps = {
	loading?: boolean;
	onEdit?: (event: OnEditEvent, newValue: string) => void;
	onCancel?: () => void;
	onToggle?: (isEditionMode: boolean) => void;
	defaultValue?: string;
	label: string;
	required?: boolean;
	placeholder: string;
	ariaLabel?: string;
	renderValueAs?: ElementType | ReactElement;
	mode: 'single' | 'multi';
} & ErrorInEditing &
	Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

const InlineEditingPrimitive = forwardRef(
	(props: InlineEditingPrimitiveProps, ref: Ref<HTMLDivElement>) => {
		const {
			loading,
			ariaLabel,
			mode,
			onEdit = () => {},
			onCancel = () => {},
			onToggle = () => {},
			required = false,
			defaultValue,
			label,
			hasError,
			description,
			placeholder,
			renderValueAs,
			...rest
		} = props;
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const [isEditing, setEditing] = useState<boolean>(false);
		const [value, setValue] = React.useState<string | undefined>(defaultValue);
		const toggleEditionMode = (isEditionMode: boolean) => {
			setEditing(isEditionMode);
			onToggle(isEditionMode);
		};

		// Errors should set InlineEditing into editing mode
		useEffect(() => {
			if (hasError) {
				toggleEditionMode(hasError);
			}
		}, [hasError]);

		const handleSubmit = (event: OnEditEvent) => {
			event.stopPropagation();
			if (onEdit) {
				const sentValue = value || '';
				onEdit(event, sentValue);
			}
			toggleEditionMode(false);
		};

		const handleCancel = () => {
			if (isEditing) {
				setValue(defaultValue);
			}
			toggleEditionMode(false);
			onCancel();
		};

		const testId = `inlineediting.${mode === 'multi' ? 'textarea' : 'input'}`;

		function ValueComponent() {
			const Default = mode === 'multi' ? 'p' : 'span';
			const sharedProps = {
				'data-placeholder': placeholder,
				'aria-hidden': value === undefined,
				className: classnames(styles.inlineEditor__content__value, {
					[styles.inlineEditor__content__value_multiline]: mode === 'multi',
				}),
			};

			if (renderValueAs && typeof renderValueAs === 'object') {
				return cloneElement(renderValueAs as unknown as ReactElement, { ...sharedProps }, [value]);
			}

			if (renderValueAs) {
				const Custom = renderValueAs;
				return <Custom {...sharedProps}>{value}</Custom>;
			}

			return <Default {...sharedProps}>{value}</Default>;
		}

		const sharedInputProps = {
			'data-test': testId,
			'data-testid': testId,
			hideLabel: true,
			hasError,
			description,
			label,
			name: label.replace(/\s/g, ''),
			required,
			placeholder,
			onChange: (
				event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
			): void => setValue(event.target.value),
			// Keyboard shortcuts
			onKeyDown: (event: React.KeyboardEvent) => {
				if (event.keyCode === keycode.codes.enter && mode !== 'multi') {
					// Enter
					handleSubmit(event);
				}
				if (event.keyCode === keycode.codes.esc) {
					handleCancel();
				}
			},
		};
		return (
			<div
				{...rest}
				data-test="inlineediting"
				data-testid="inlineediting"
				className={styles.inlineEditor}
				ref={ref}
			>
				{isEditing ? (
					<>
						<div className={styles.inlineEditor__editor}>
							{mode === 'multi' && <Form.Textarea {...sharedInputProps}>{value}</Form.Textarea>}
							{mode === 'single' && (
								<Form.Text value={value} {...sharedInputProps} data-padding-override />
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
										data-testid="inlineediting.button.cancel"
										data-test="inlineediting.button.cancel"
										size="XS"
									>
										{t('INLINE_EDITING_CANCEL', 'Cancel')}
									</ButtonIcon>
									<ButtonIcon
										onClick={handleSubmit}
										icon="check-filled"
										data-testid="inlineediting.button.submit"
										data-test="inlineediting.button.submit"
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
								data-testid="inlineediting.button.edit"
								data-test="inlineediting.button.edit"
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
