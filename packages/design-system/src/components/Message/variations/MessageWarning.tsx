import { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';
import styles from './MessageWarning.module.css';

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
