import { Children, cloneElement, forwardRef } from 'react';
import type { Ref, FieldsetHTMLAttributes } from 'react';
import { isElement } from 'react-is';

import styles from './Fieldset.module.scss';

export type FieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
	legend?: string;
	required?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
};

const Fieldset = forwardRef(
	(
		{ legend, children, disabled, readOnly, required, ...rest }: FieldsetProps,
		ref: Ref<HTMLFieldSetElement>,
	) => {
		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<fieldset className={styles.fieldset} disabled={disabled} {...rest} ref={ref}>
				{legend && (
					<legend className={styles.legend}>
						{legend}
						{required && '*'}
					</legend>
				)}
				{Children.toArray(children).map(child =>
					isElement(child) ? cloneElement(child, childrenProps) : child,
				)}
			</fieldset>
		);
	},
);

Fieldset.displayName = 'Fieldset';

export default Fieldset;
