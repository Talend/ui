import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, BaseInlineMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageWarning.module.scss';

export type MessageWarningProps = Omit<BaseInlineMessageProps, 'className' | 'borderClassname'>;

export const MessageWarning = forwardRef((props: MessageWarningProps, ref: Ref<HTMLDivElement>) => {
	return <MessagePrimitive {...props} ref={ref} borderClassname={styles.warning_border} />;
});

MessageWarning.displayName = 'MessageWarning';
