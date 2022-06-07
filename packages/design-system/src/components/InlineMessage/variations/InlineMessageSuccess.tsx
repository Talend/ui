import React, { forwardRef, Ref } from 'react';

import InlineMessagePrimitive, {
	BaseInlineMessageProps,
} from '../Primitive/InlineMessagePrimitive';

import styles from './InlineMessageSuccess.module.scss';

export type InlineMessageSuccessProps = Omit<
	BaseInlineMessageProps,
	'className' | 'icon' | 'iconClassname' | 'withBackgroundClassname'
>;

const InlineMessageSuccess = forwardRef(
	(props: InlineMessageSuccessProps, ref: Ref<HTMLDivElement>) => {
		return (
			<InlineMessagePrimitive
				{...props}
				icon="talend-check-circle"
				withBackgroundClassname={styles.success_withBackground}
				iconClassname={styles.success__icon}
				ref={ref}
			/>
		);
	},
);

InlineMessageSuccess.displayName = 'InlineMessageSuccess';

export default InlineMessageSuccess;