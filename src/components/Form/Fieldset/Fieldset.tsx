import React from 'react';
import * as S from './Fieldset.style';

export type FieldsetProps = React.PropsWithChildren<HTMLFieldSetElement> & {
	legend?: string;
};

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
	({ legend, children }: FieldsetProps, ref) => {
		return (
			<S.Fieldset ref={ref}>
				{legend && <S.Legend>{legend}</S.Legend>}
				{children}
			</S.Fieldset>
		);
	},
);

export default Fieldset;
