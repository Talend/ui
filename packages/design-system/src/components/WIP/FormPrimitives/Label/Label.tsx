import React, { forwardRef, ReactElement, Ref, LabelHTMLAttributes } from 'react';
import classnames from 'classnames';

export type LabelProps = LabelHTMLAttributes<any> & {
	children: string | ReactElement;
	inline?: boolean;
};

import styles from './Label.module.scss';

const Label = forwardRef((props: LabelProps, ref: Ref<HTMLLabelElement>) => {
	const { children, inline = false, className, ...rest } = props;

	return (
		<label
			{...rest}
			className={classnames(styles.label, { [styles.label_inline]: inline }, className)}
			ref={ref}
		>
			{children}
		</label>
	);
});

Label.displayName = 'Label';

export default Label;
