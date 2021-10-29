import React from 'react';
import classnames from 'classnames';
import { unstable_useId as useId } from 'reakit';

import Loading from '../../Loading';
import VisuallyHidden from '../../VisuallyHidden';
import InlineMessage from '../../InlineMessage';
import Link from '../../Link';

import * as S from './Field.style';

type WithInlineMessageProps = {
	hasError?: boolean;
	hasWarning?: boolean;
	hasSuccess?: boolean;
	hasInformation?: boolean;
	description?: string;
};

type ControlProps = WithInlineMessageProps & {
	as?: React.ElementType;
	type?: string | undefined;
	label: string;
	hideLabel?: boolean;
	before?: React.ReactNode;
	after?: React.ReactNode;
	loading?: boolean;
	indeterminate?: boolean;
	multiple?: boolean;
	link?: typeof Link;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & ControlProps;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & ControlProps;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & ControlProps;

export type FieldProps = InputProps | TextareaProps | SelectProps;

const Field = React.forwardRef(
	(
		props: FieldProps,
		ref: React.Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const {
			as = 'input',
			className = '',
			label,
			hideLabel,
			before,
			after,
			id,
			loading,
			link,
			hasError,
			hasWarning,
			hasSuccess,
			hasInformation,
			description,
			required,
			disabled,
			...rest
		} = props;

		let checked;
		let readOnly;

		const { id: reakitId } = useId();
		const fieldId = id || `field--${reakitId}`;
		const fieldDescriptionId = `field__description--${reakitId}`;

		const { multiple, type = '' } = rest;
		const inline = ['checkbox', 'radio'].includes(type);

		if ('checked' in props) {
			checked = props.checked;
		}
		if ('readOnly' in props) {
			readOnly = props.readOnly;
		}

		const Label = () => (
			<S.FieldLabel className="c-field__label" htmlFor={fieldId} disabled={!!disabled}>
				{label}
				{required && '*'}
			</S.FieldLabel>
		);

		const WrappedLabel = () =>
			hideLabel ? (
				<VisuallyHidden>
					<Label />
				</VisuallyHidden>
			) : (
				<Label />
			);

		const Description = () => {
			const descProps = {
				small: true,
				description,
			};
			if (hasError) {
				return <InlineMessage.Destructive {...descProps} />;
			}
			if (hasWarning) {
				return <InlineMessage.Warning {...descProps} />;
			}
			if (hasSuccess) {
				return <InlineMessage.Success {...descProps} />;
			}
			if (hasInformation) {
				return <InlineMessage.Information {...descProps} />;
			}
			return <InlineMessage {...descProps} />;
		};

		return (
			<S.Field className={`c-field ${typeof as === 'string' ? `c-field--${as}` : ''}`}>
				{!inline && label && <WrappedLabel />}
				<S.FieldGroup
					className={classnames(
						'c-field__group',
						{ [`c-field__group--${as}`]: typeof as === 'string' },
						{
							'c-field__group--multiple': multiple,
							'c-field__group--loading': loading,
							'c-field__group--has-error': hasError,
							'c-field__group--has-warning': hasWarning,
							'c-field__group--has-information': hasInformation,
						},
					)}
					after={after}
				>
					{before}
					<S.FieldControl
						{...rest}
						as={as}
						id={fieldId}
						className={classnames(className, 'c-field__control', {
							[`c-field__control--${as}`]: typeof as === 'string',
							'c-input--read-only': readOnly,
							'c-input--checked': checked,
							'c-input--disabled': disabled,
						})}
						aria-describedby={description && fieldDescriptionId}
						checked={checked}
						readOnly={readOnly}
						disabled={disabled}
						ref={ref}
					/>
					{loading && <Loading className="c-field__loading" />}
					{after}
				</S.FieldGroup>
				{link}
				{inline && label && <WrappedLabel />}
				{description && (
					<div id={fieldDescriptionId} className="c-field__description">
						<Description />
					</div>
				)}
			</S.Field>
		);
	},
);

export default Field;
