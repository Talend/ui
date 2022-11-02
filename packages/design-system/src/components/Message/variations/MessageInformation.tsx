import React, { forwardRef, Ref } from 'react';

import { MessagePrimitive, SharedMessageProps } from '../Primitive/MessagePrimitive';

import styles from './MessageInformation.module.scss';

export type MessageInformationProps = Omit<SharedMessageProps, 'className'>;

export const MessageInformation = forwardRef(
	(props: MessageInformationProps, ref: Ref<HTMLDivElement>) => {
		return (
			<MessagePrimitive
				{...props}
				ref={ref}
				borderClassname={styles.information_border}
				icon={undefined}
			/>
		);
	},
);

MessageInformation.displayName = 'MessageInformation';
