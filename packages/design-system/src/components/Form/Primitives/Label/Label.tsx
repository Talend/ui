import { forwardRef, LabelHTMLAttributes, ReactElement, Ref } from 'react';

import classnames from 'classnames';

import styles from './Label.module.css';

export type LabelPrimitiveProps = LabelHTMLAttributes<any> & {
	children: string | ReactElement;
	inline?: boolean;
	required?: boolean;
};

const Label = forwardRef((props: LabelPrimitiveProps, ref: Ref<HTMLLabelElement>) => {
	const { children, inline = false, required = false, className, ...rest } = props;

	return (
		<label
			{...rest}
			className={classnames(styles.label, { [styles.label_inline]: inline }, className)}
			ref={ref}
		>
			{children}
			{required && '*'}
		</label>
	);
});

Label.displayName = 'Label';

export default Label;
