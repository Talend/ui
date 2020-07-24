import React from 'react';

import Loading from '../../Loading';

import * as S from './Field.style';

const Field = React.forwardRef(
	({ className = '', label, before, after, loading, ...rest }, ref) => {
		const { as, multiple, type } = rest;
		const inline = ['checkbox', 'radio'].includes(type);

		const getLabel = () => {
			return (
				<S.FieldLabel className="field__label" htmlFor={label}>
					{label}
				</S.FieldLabel>
			);
		};

		return (
			<S.Field className={`field ${typeof as === 'string' ? `field--${as}` : ''}`} inline={inline}>
				{label && !inline && getLabel(label)}
				<S.FieldGroup
					className={`field__group ${typeof as === 'string' ? `field__group--${as}` : ''} ${
						multiple ? 'field__group--multiple' : ''
					} ${loading ? 'field__group--loading' : ''}`}
					after={after}
				>
					{before}
					<S.FieldControl
						{...rest}
						id={label}
						className={`${className} field__control ${
							typeof as === 'string' ? `field__control--${as}` : ''
						}`}
						ref={ref}
					/>
					{loading && <Loading className="field__loading" />}
					{after}
				</S.FieldGroup>
				{label && inline && getLabel(label)}
			</S.Field>
		);
	},
);

export default Field;
