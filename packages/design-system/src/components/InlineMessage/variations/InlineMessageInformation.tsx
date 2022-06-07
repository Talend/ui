import React, { forwardRef, Ref } from 'react';

import InlineMessagePrimitive, {
	BaseInlineMessageProps,
} from '../Primitive/InlineMessagePrimitive';

import styles from './InlineMessageInformation.module.scss';

export type InlineMessageInformationProps = Omit<
	BaseInlineMessageProps,
	'className' | 'icon' | 'iconClassname' | 'withBackgroundClassname'
>;

const InlineMessageInformation = forwardRef(
	(props: InlineMessageInformationProps, ref: Ref<HTMLDivElement>) => {
		return (
			<InlineMessagePrimitive
				{...props}
				icon="talend-info-circle"
				withBackgroundClassname={styles.information_withBackground}
				iconClassname={styles.information__icon}
				ref={ref}
			/>
		);
	},
);

InlineMessageInformation.displayName = 'InlineMessageInformation';

export default InlineMessageInformation;
