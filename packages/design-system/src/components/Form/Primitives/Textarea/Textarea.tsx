import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';

type TextareaProps = HTMLAttributes<HTMLTextAreaElement>;

import styles from './Textarea.m.scss';

const Textarea = forwardRef((props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
	const { className, ...rest } = props;
	return <textarea {...rest} ref={ref} className={classnames(styles.textarea, className)} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
