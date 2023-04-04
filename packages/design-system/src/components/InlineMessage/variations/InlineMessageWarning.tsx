import { forwardRef, Ref } from 'react';

import InlineMessagePrimitive, {
	BaseInlineMessageProps,
} from '../Primitive/InlineMessagePrimitive';

import styles from './InlineMessageWarning.module.scss';

export type InlineMessageWarningProps = Omit<
	BaseInlineMessageProps,
	'className' | 'icon' | 'iconClassname' | 'withBackgroundClassname'
>;

const InlineMessageWarning = forwardRef(
	(props: InlineMessageWarningProps, ref: Ref<HTMLDivElement>) => {
		return (
			<InlineMessagePrimitive
				{...props}
				icon="exclamation"
				withBackgroundClassname={styles.warning_withBackground}
				iconClassname={styles.warning__icon}
				ref={ref}
			/>
		);
	},
);

InlineMessageWarning.displayName = 'InlineMessageWarning';

export default InlineMessageWarning;
