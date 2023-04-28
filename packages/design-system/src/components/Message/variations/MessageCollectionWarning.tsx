import { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageWarning.module.scss';

export const MessageCollectionWarning = forwardRef(
	(props: SharedMessageCollectionProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.warning_border}
				icon="folder-closed"
			/>
		);
	},
);

MessageCollectionWarning.displayName = 'MessageCollectionWarning';
