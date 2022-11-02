import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageDestructive.module.scss';

export type MessageDestructiveProps = Omit<SharedMessageProps, 'className'>;

export const MessageDestructive = forwardRef(
	(props: SharedMessageProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.destructive_border}
				icon={undefined}
			/>
		);
	},
);

MessageDestructive.displayName = 'MessageDestructive';
