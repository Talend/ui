import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import classnames from 'classnames';

type LabelProps = HTMLAttributes<HTMLLabelElement> & {
	children: string | ReactElement;
	inline?: boolean;
};

import styles from './Label.module.scss';

const Label = forwardRef((props: LabelProps, ref: Ref<HTMLLabelElement>) => {
	const { children, inline = false, className, ...rest } = props;

	return (
		<label
			{...props}
			className={classnames(styles.label, { [styles.label_inline]: inline }, className)}
			ref={ref}
		>
			{children}
		</label>
	);
});

Label.displayName = 'Label';

export default Label;
