import React, { forwardRef, Ref } from 'react';

import InlineMessagePrimitive, {
	BaseInlineMessageProps,
} from '../Primitive/InlineMessagePrimitive';

import styles from './InlineMessageBeta.module.scss';

export type InlineMessageBetaProps = Omit<
	BaseInlineMessageProps,
	'className' | 'icon' | 'iconClassname' | 'withBackgroundClassname'
>;

const InlineMessageBeta = forwardRef((props: InlineMessageBetaProps, ref: Ref<HTMLDivElement>) => {
	return (
		<InlineMessagePrimitive
			{...props}
			icon="talend-info-circle"
			withBackgroundClassname={styles.beta_withBackground}
			iconClassname={styles.beta__icon}
			ref={ref}
		/>
	);
});

InlineMessageBeta.displayName = 'InlineMessageBeta';

export default InlineMessageBeta;
