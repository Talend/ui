import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, BaseInlineMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageInformation.module.scss';

export type MessageInformationProps = Omit<BaseInlineMessageProps, 'className' | 'borderClassname'>;

export const MessageInformation = forwardRef(
	(props: MessageInformationProps, ref: Ref<HTMLDivElement>) => {
		return <MessagePrimitive {...props} ref={ref} borderClassname={styles.information_border} />;
	},
);

MessageInformation.displayName = 'MessageInformation';
