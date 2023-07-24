import { forwardRef, cloneElement, Children } from 'react';
import type { FormHTMLAttributes, Ref } from 'react';

import { isElement } from 'react-is';

import styles from './Form.module.scss';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
	disabled?: boolean;
	readOnly?: boolean;
};

const Form = forwardRef(
	({ disabled, readOnly, children, ...rest }: FormProps, ref: Ref<HTMLFormElement>) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<form className={styles.form} {...rest} ref={ref}>
				{Children.toArray(children).map(child =>
					isElement(child) ? cloneElement(child, childrenProps) : child,
				)}
			</form>
		);
	},
);

Form.displayName = 'Form';

export default Form;
