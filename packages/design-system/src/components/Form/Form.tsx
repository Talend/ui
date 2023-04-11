import * as React from 'react';
import { isElement } from 'react-is';

import styles from './Form.module.scss';

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
			<form className={styles.form} {...rest} ref={ref}>
				{React.Children.toArray(children).map(child =>
					isElement(child) ? React.cloneElement(child, childrenProps) : child,
				)}
			</form>
		);
	},
);

Form.displayName = 'Form';

export default Form;
