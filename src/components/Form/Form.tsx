import React from 'react';
import { isElement } from 'react-is';

import * as S from './Form.style';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Form = React.forwardRef(
	({ disabled, readOnly, children, ...rest }: FormProps, ref: React.Ref<HTMLFormElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<S.Form className="c-form" {...rest} ref={ref}>
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</S.Form>
		);
	},
);

export default Form;
