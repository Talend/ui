import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';

type InputProps = HTMLAttributes<HTMLInputElement>;

import styles from './Input.m.scss';

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
	const { className, ...rest } = props;
	return <input {...rest} ref={ref} className={classnames(styles.input, className)} />;
});

Input.displayName = 'Input';

export default Input;
