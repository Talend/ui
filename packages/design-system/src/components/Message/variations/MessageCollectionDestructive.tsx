import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageDestructive.module.scss';

export type MessageCollectionDestructiveProps = Omit<SharedMessageCollectionProps, 'className'>;

export const MessageCollectionDestructive = forwardRef(
	(props: MessageCollectionDestructiveProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.destructive_border}
				icon="folder-closed"
			/>
		);
	},
);

MessageCollectionDestructive.displayName = 'MessageCollectionDestructive';
