import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';
import classnames from 'classnames';

type InputProps = InputHTMLAttributes<any>;

import styles from './Input.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
	const { className, ...rest } = props;
	return (
		<InputWrapper>
			<Input {...rest} ref={ref} className={classnames(styles.input, className)} />
		</InputWrapper>
	);
});

Input.displayName = 'Input';

export default Input;
