import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageCollectionProps } from '../Primitive/MessagePrimitive';

import styles from './MessageInformation.module.scss';

export type MessageCollectionInformationProps = Omit<SharedMessageCollectionProps, 'className'>;

export const MessageCollectionInformation = forwardRef(
	(props: MessageCollectionInformationProps, ref: Ref<HTMLDivElement>) => {
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
