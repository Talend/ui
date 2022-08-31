import React, { forwardRef, LabelHTMLAttributes, ReactElement, Ref } from 'react';
import classnames from 'classnames';
import styles from './Label.module.scss';
import { ReactI18NextChild } from 'react-i18next';

export type LabelProps =
	| LabelHTMLAttributes<any> & {
			children: string | ReactElement | ReactI18NextChild;
			inline?: boolean;
	  };

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
