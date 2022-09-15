import React, { PropsWithChildren } from 'react';
import { StyledProps } from 'styled-components';
import { useTranslation } from 'react-i18next';
import useKey from 'react-use/lib/useKey';
import classNames from 'classnames';
import { ButtonIcon } from '../ButtonIcon';
import Form from '../Form';

import * as S from './InlineEditing.style';
import { StackHorizontal } from '../Stack';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';

export enum Mode {
	Single,
	Multi,
}

export type InlineEditingProps = PropsWithChildren<any> &
	StyledProps<any> & {
		/** if the inline editing is a required field */
		required?: boolean;
		/** the inline editing label */
		label: string;
		/** the inline editing default value */
		value: string;
		/** the inline editing edit button aria-label */
		ariaLabel: string;
		/** if the inline editing has an error */
		hasError?: boolean;
		/** if the inline editing in in progress */
		loading?: boolean;
		/** called on submit with the new value */
		onEdit?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent, newValue: string) => void;
		/** called on cancel */
		onCancel?: () => void;
		/** the inline editing display mode */
		mode: Mode;
		renderAs?: React.ElementType;
	};

export type StyledInlineEditing = {
	renderAs?: React.ComponentType<any> | string;
} & InlineEditingProps;

const InlineEditing = React.forwardRef(
	(
		{
			mode,
			label,
			loading,
			hasError,
			required,
			renderAs,
			ariaLabel,
			placeholder,
			defaultValue,
			renderValueAs,
			onEdit = () => {},
			onCancel = () => {},
			...rest
		}: StyledInlineEditing,
		ref,
	) => {
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const [isEditing, setEditMode] = React.useState(false);
		const [value, setValue] = React.useState(defaultValue);

		const handleSubmit = (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			event.stopPropagation();
			if (onEdit) {
				onEdit(event, value);
			}
			setEditMode(false);
		};

		const handleCancel = () => {
			if (isEditing) {
				setValue(defaultValue);
			}
			setEditMode(false);
			onCancel();
		};
		React.useEffect(() => setEditMode(hasError), [hasError]);

		useKey('Escape', handleCancel, {}, [isEditing]);
		useKey(
			'Enter',
			(event: KeyboardEvent): void => {
				if (mode !== Mode.Multi) {
					handleSubmit(event);
				}
			},
			{},
			[isEditing, value],
		);

		const Input = mode === Mode.Multi ? Form.Textarea : Form.Text;
		const testId = `inlineediting.${mode === Mode.Multi ? 'textarea' : 'input'}`;

		return (
			<S.InlineEditing data-test="inlineediting" {...rest} ref={ref}>
				{isEditing ? (
					<div className="c-inline-editing--editing">
						<form>
							<Input
								hideLabel
								label={label}
								value={value}
								required={required}
								hasError={hasError}
								placeholder={placeholder}
								onChange={(
									event:
										| React.ChangeEvent<HTMLInputElement>
										| React.ChangeEvent<HTMLTextAreaElement>,
								): void => setValue(event.target.value)}
								data-test={testId}
								data-padding-override={mode !== Mode.Multi}
							/>
							<div className="c-inline-editing__actions">
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
										data-test="inlineediting.button.cancel"
										size="XS"
									>
										{t('INLINE_EDITING_CANCEL', 'Cancel')}
									</ButtonIcon>
									<ButtonIcon
										onClick={handleSubmit}
										icon="check-filled"
										data-test="inlineediting.button.submit"
										size="XS"
									>
										{t('INLINE_EDITING_SUBMIT', 'Submit')}
									</ButtonIcon>
								</StackHorizontal>
							</div>
						</form>
					</div>
				) : (
					<div
						className={classNames('c-inline-editing--static', { loading })}
						onDoubleClick={loading ? undefined : () => setEditMode(true)}
					>
						<S.InlineEditingValue
							className="c-inline-editing__value"
							data-placeholder={placeholder}
							as={renderValueAs || renderAs}
							aria-hidden={value !== undefined}
						>
							{value}
						</S.InlineEditingValue>
						<span className="c-inline-editing__action">
							<ButtonIcon
								data-test="inlineediting.button.edit"
								onClick={() => setEditMode(true)}
								aria-label={ariaLabel}
								icon="pencil"
								disabled={loading}
								size="XS"
							>
								{t('INLINE_EDITING_EDIT', 'Edit')}
							</ButtonIcon>
						</span>
					</div>
				)}
			</S.InlineEditing>
		);
	},
);

export default InlineEditing;
