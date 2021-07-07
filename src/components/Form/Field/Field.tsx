import React from 'react';
import classnames from 'classnames';

import Loading from '../../Loading';
import InlineMessage from '../../InlineMessage';

import * as S from './Field.style';

export type FieldProps = HTMLInputElement & {
	as?: React.ElementType;
	label: string;
	before?: React.ReactNode;
	after?: React.ReactNode;
	indeterminate?: boolean;
	loading?: boolean;
	link?: React.ReactNode;
	hasError?: boolean;
	hasWarning?: boolean;
	hasSuccess?: boolean;
	hasInformation?: boolean;
	description?: string;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
	(
		{
			as = 'input',
			className = '',
			label,
			before,
			after,
			id = `field--${Math.floor(Math.random() * 100)}`,
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
		ref,
	) => {
		const { multiple, type = '' } = rest;
		const inline = ['checkbox', 'radio'].includes(type);

		const Label = () => (
			<S.FieldLabel className="field__label" htmlFor={id} disabled={!!disabled}>
				{label}
				{required && '*'}
			</S.FieldLabel>
		);

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
				{!inline && label && <Label />}
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
						id={id}
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
				{inline && label && <Label />}
				{description && <Description />}
			</S.Field>
		);
	},
);

export default Field;
