import React, { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';

type TextareaProps = TextareaHTMLAttributes<any> & { isError?: boolean };

import styles from './Textarea.module.scss';

const Textarea = forwardRef((props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
	const { className, readOnly = false, disabled = false, isError = false, ...rest } = props;
	return (
		<textarea
			{...rest}
			ref={ref}
			disabled={disabled}
			readOnly={readOnly}
			className={classnames(
				styles.textarea,
				{
					[styles.textarea_readOnly]: readOnly,
					[styles.textarea_disabled]: disabled,
					[styles.textarea_borderError]: isError,
				},
				className,
			)}
		/>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
