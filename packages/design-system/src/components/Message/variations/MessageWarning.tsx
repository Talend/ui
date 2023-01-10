import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageWarning.module.scss';

export const MessageWarning = forwardRef((props: SharedMessageProps, ref: Ref<HTMLDivElement>) => {
	return (
		<MessagePrimitive
			{...props}
			ref={ref}
			borderClassname={styles.warning_border}
			icon={undefined}
		/>
	);
});

MessageWarning.displayName = 'MessageWarning';
