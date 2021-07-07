import React from 'react';
import { isElement } from 'react-is';
import * as S from './Fieldset.style';

export type FieldsetProps = React.PropsWithChildren<HTMLFieldSetElement> & {
	legend?: string;
	required?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
};

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
	({ legend, children, disabled, readOnly, required, ...rest }: FieldsetProps, ref) => {
		return (
			// @ts-ignore
			<S.Fieldset {...rest} ref={ref}>
				{legend && (
					<S.Legend>
						{legend}
						{required && '*'}
					</S.Legend>
				)}
				{React.Children.toArray(children).map((child, key: number) =>
					isElement(child)
						? React.cloneElement(child, {
								key: `fieldset-${key}`,
								disabled,
								readOnly,
						  })
						: child,
				)}
			</S.Fieldset>
		);
	},
);

export default Fieldset;
