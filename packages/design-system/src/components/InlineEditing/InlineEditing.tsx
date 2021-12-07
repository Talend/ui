import React, { PropsWithChildren } from 'react';
import { StyledProps } from 'styled-components';
import { useTranslation } from 'react-i18next';
import useKey from 'react-use/lib/useKey';
import classNames from 'classnames';
import Button from '../Button';
import Form from '../Form';

import * as S from './InlineEditing.style';

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
} & React.PropsWithRef<InlineEditingProps>;

const InlineEditing = React.forwardRef(
	(
		{
			mode,
			label,
			loading,
			hasError,
			required,
			renderAs,
			placeholder,
			defaultValue,
			renderValueAs,
			onEdit = () => {},
			onCancel = () => {},
			...rest
		}: StyledInlineEditing,
		ref,
	) => {
		const { t } = useTranslation();
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
							/>
							<div className="c-inline-editing__actions">
								<Button.Icon
									onClick={handleCancel}
									icon="talend-cross-circle"
									data-test="inlineediting.button.cancel"
								>
									{t('INLINE_EDITING_CANCEL', 'Cancel')}
								</Button.Icon>
								<Button.Icon
									onClick={handleSubmit}
									icon="talend-check-circle"
									data-test="inlineediting.button.submit"
								>
									{t('INLINE_EDITING_SUBMIT', 'Submit')}
								</Button.Icon>
							</div>
						</form>
					</div>
				) : (
					<div
						className={classNames('c-inline-editing--static', { loading })}
						onDoubleClick={loading ? undefined : () => setEditMode(true)}
					>
						<S.InlineEditingValue
							// className="c-inline-editing__value"
							className={classNames('c-inline-editing__value', { placeholder: !value })}
							as={renderValueAs || renderAs}
						>
							{value || placeholder}
						</S.InlineEditingValue>
						<Button.Icon
							className="c-inline-editing__action"
							icon="talend-pencil"
							onClick={() => setEditMode(true)}
							disabled={loading}
							data-test="inlineediting.button.edit"
						>
							{t('INLINE_EDITING_EDIT', 'Edit')}
						</Button.Icon>
					</div>
				)}
			</S.InlineEditing>
		);
	},
);

export default InlineEditing;
