import React from 'react';
import { isElement } from 'react-is';
import * as S from './Fieldset.style';

export type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
	legend?: string;
	required?: boolean;
	readOnly?: boolean;
};

const Fieldset = React.forwardRef(
	(
		{ legend, children, disabled, readOnly, required, ...rest }: FieldsetProps,
		ref: React.Ref<HTMLFieldSetElement>,
	) => {
		const childrenProps = readOnly ? { readOnly: true } : {};
		return (
			<S.Fieldset className="c-fieldset" disabled={disabled} {...rest} ref={ref}>
				{legend && (
					<S.Legend className="c-fieldset__legend">
						{legend}
						{required && '*'}
					</S.Legend>
				)}
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</S.Fieldset>
		);
	},
);

export default Fieldset;
