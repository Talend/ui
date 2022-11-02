import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageSuccess.module.scss';

export type MessageSuccessProps = Omit<SharedMessageProps, 'className'>;

export const MessageSuccess = forwardRef((props: MessageSuccessProps, ref: Ref<HTMLDivElement>) => {
	return (
		<MessagePrimitive
			{...props}
			ref={ref}
			borderClassname={styles.success_border}
			icon={undefined}
		/>
	);
});

MessageSuccess.displayName = 'MessageSuccess';
