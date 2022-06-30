import React, { forwardRef, Ref } from 'react';

import InlineMessagePrimitive, {
	BaseInlineMessageProps,
} from '../Primitive/InlineMessagePrimitive';

import styles from './InlineMessageDestructive.module.scss';

export type InlineMessageDestructiveProps = Omit<
	BaseInlineMessageProps,
	'className' | 'icon' | 'iconClassname' | 'withBackgroundClassname'
>;

const InlineMessageDestructive = forwardRef(
	(props: InlineMessageDestructiveProps, ref: Ref<HTMLDivElement>) => {
		return (
			<InlineMessagePrimitive
				{...props}
				icon="square-cross"
				withBackgroundClassname={styles.destructive_withBackground}
				iconClassname={styles.destructive__icon}
				ref={ref}
			/>
		);
	},
);

InlineMessageDestructive.displayName = 'InlineMessageDestructive';

export default InlineMessageDestructive;
