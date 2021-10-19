import React from 'react';
import classnames from 'classnames';
import { unstable_useId as useId } from 'reakit';

import Loading from '../../Loading';
import VisuallyHidden from '../../VisuallyHidden';
import InlineMessage from '../../InlineMessage';

import * as S from './Field.style';

export type FieldProps = (
	| React.InputHTMLAttributes<HTMLInputElement>
	| React.TextareaHTMLAttributes<HTMLTextAreaElement>
	| React.SelectHTMLAttributes<HTMLSelectElement>
) & {
	as?: React.ElementType;
	label: string;
	before?: React.ReactNode;
	after?: React.ReactNode;
	type?: string | undefined;
	indeterminate?: boolean;
	multiple?: boolean;
	loading?: boolean;
	link?: React.ReactNode;
	hasError?: boolean;
	hasWarning?: boolean;
	hasSuccess?: boolean;
	hasInformation?: boolean;
	hideLabel?: boolean;
	description?: string;
};

const Field = React.forwardRef(
	(
		{
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
		}: FieldProps,
		ref: React.Ref<HTMLElement>,
	) => {
		const { id: reakitId } = useId();
		const fieldId = `field--${id || reakitId}`;
		const { multiple, type = '' } = rest;
		const inline = ['checkbox', 'radio'].includes(type);

		const Label = () => (
			<S.FieldLabel className="field__label" htmlFor={fieldId} disabled={!!disabled}>
				{label}
				{required && '*'}
			</S.FieldLabel>
		);

		const WrappedLabel = () => hideLabel ? <VisuallyHidden><Label /></VisuallyHidden> : <Label />;

		const Description = () => {
			if (hasError) {
				return <InlineMessage.Destructive small description={description} />;
			}
			if (hasWarning) {
				return <InlineMessage.Warning small description={description} />;
			}
			if (hasSuccess) {
				return <InlineMessage.Success small description={description} />;
			}
			if (hasInformation) {
				return <InlineMessage.Information small description={description} />;
			}
			return <InlineMessage small description={description} />;
		};

		return (
			<S.Field className={`field ${typeof as === 'string' ? `field--${as}` : ''}`}>
				{!inline && label && <WrappedLabel />}
				<S.FieldGroup
					className={classnames(
						'field__group',
						{ [`field__group--${as}`]: typeof as === 'string' },
						{
							'field__group--multiple': multiple,
							'field__group--loading': loading,
							'field__group--has-error': hasError,
							'field__group--has-warning': hasWarning,
							'field__group--has-information': hasInformation,
						},
					)}
					after={after}
				>
					{before}
					<S.FieldControl
						{...rest}
						as={as}
						id={fieldId}
						className={classnames(className, 'field__control', {
							[`field__control--${as}`]: typeof as === 'string',
						})}
						disabled={disabled}
						ref={ref}
					/>
					{loading && <Loading className="field__loading" />}
					{after}
				</S.FieldGroup>
				{link}
				{inline && label && <WrappedLabel />}
				{description && <Description />}
			</S.Field>
		);
	},
);

export default Field;
