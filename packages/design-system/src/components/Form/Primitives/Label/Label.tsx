import { forwardRef, LabelHTMLAttributes, ReactElement, Ref } from 'react';
import classnames from 'classnames';
import styles from './Label.module.scss';
import { ReactI18NextChild } from 'react-i18next';

export type LabelPrimitiveProps =
	| LabelHTMLAttributes<any> & {
			children: string | ReactElement | ReactI18NextChild;
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
