import { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageDestructive.module.scss';

export const MessageCollectionDestructive = forwardRef(
	(props: SharedMessageCollectionProps, ref: Ref<HTMLDivElement>) => {
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
