import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageWarning.module.scss';

export type MessageCollectionWarningProps = Omit<SharedMessageCollectionProps, 'className'>;

export const MessageCollectionWarning = forwardRef(
	(props: MessageCollectionWarningProps, ref: Ref<HTMLDivElement>) => {
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
