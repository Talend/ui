import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, BaseInlineMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageDestructive.module.scss';

export type MessageDestructiveProps = Omit<BaseInlineMessageProps, 'className' | 'borderClassname'>;

export const MessageDestructive = forwardRef(
	(props: MessageDestructiveProps, ref: Ref<HTMLDivElement>) => {
		return <MessagePrimitive {...props} ref={ref} borderClassname={styles.destructive_border} />;
	},
);

MessageDestructive.displayName = 'MessageDestructive';
