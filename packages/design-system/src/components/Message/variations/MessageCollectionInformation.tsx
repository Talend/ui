import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageInformation.module.scss';

export const MessageCollectionInformation = forwardRef(
	(props: SharedMessageCollectionProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.information_border}
				icon="folder-closed"
			/>
		);
	},
);

MessageCollectionInformation.displayName = 'MessageCollectionInformation';
