import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageSuccess.module.scss';

export const MessageSuccess = forwardRef((props: SharedMessageProps, ref: Ref<HTMLDivElement>) => {
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
