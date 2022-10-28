import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, BaseInlineMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageSuccess.module.scss';

export type MessageSuccessProps = Omit<BaseInlineMessageProps, 'className' | 'borderClassname'>;

export const MessageSuccess = forwardRef((props: MessageSuccessProps, ref: Ref<HTMLDivElement>) => {
	return <MessagePrimitive {...props} ref={ref} borderClassname={styles.success_border} />;
});

MessageSuccess.displayName = 'MessageSuccess';
