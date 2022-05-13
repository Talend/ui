import React, { forwardRef, Ref, InputHTMLAttributes, ReactElement } from 'react';
import { Checkbox as ReakitCheckbox, CheckboxProps, useCheckboxState } from 'reakit';
import classnames from 'classnames';
import Label from '../Label/Label';

import styles from './Checkbox.module.scss';

type CheckboxType = Omit<CheckboxProps, 'type' | 'prefix'> & {
	label: string | ReactElement;
	id: string;
	indeterminate?: boolean;
};

const Checkbox = forwardRef((props: CheckboxType, ref: Ref<HTMLInputElement>) => {
	const { id, label, readOnly, disabled, checked, defaultChecked, indeterminate, ...rest } = props;
	const checkboxState = useCheckboxState({
		state: (indeterminate && 'indeterminate') || checked || defaultChecked,
	});

	return (
		<span className={classnames(styles.checkbox, { [styles.checkbox_readOnly]: readOnly })}>
			<ReakitCheckbox
				{...checkboxState}
				type="checkbox"
				disabled={disabled || readOnly}
				ref={ref}
				id={id}
				{...rest}
			/>
			<Label htmlFor={id} inline>
				{label}
			</Label>
		</span>
	);
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
