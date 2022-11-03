import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageSuccess.module.scss';

export const MessageCollectionSuccess = forwardRef(
	(props: SharedMessageCollectionProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.success_border}
				icon="folder-closed"
			/>
		);
	},
);

MessageCollectionSuccess.displayName = 'MessageCollectionSuccess';
