import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import InputWrapper, { AffixesProps } from '../InputWrapper/InputWrapper';

type InputProps = Omit<InputHTMLAttributes<any>, 'prefix' | 'suffix'> & AffixesProps;

import styles from './Input.module.scss';

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
	const { className, prefix, suffix, readOnly, disabled, ...rest } = props;
	return (
		<InputWrapper prefix={prefix} suffix={suffix} disabled={!!disabled} readOnly={!!readOnly}>
			<input
				{...rest}
				ref={ref}
				disabled={!!disabled}
				className={classnames(styles.input, { [styles.input_readOnly]: !!readOnly }, className)}
			/>
		</InputWrapper>
	);
});

Input.displayName = 'Input';

export default Input;
