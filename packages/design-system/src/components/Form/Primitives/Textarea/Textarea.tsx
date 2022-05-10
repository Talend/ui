import React, { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';

type TextareaProps = TextareaHTMLAttributes<any>;

import styles from './Textarea.module.scss';

const Textarea = forwardRef((props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
	const { className, readOnly, disabled, ...rest } = props;
	return (
		<textarea
			{...rest}
			ref={ref}
			disabled={disabled || readOnly}
			className={classnames(
				styles.textarea,
				{ [styles.textarea_readOnly]: !!readOnly, [styles.textarea_disabled]: !!disabled },
				className,
			)}
		/>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
