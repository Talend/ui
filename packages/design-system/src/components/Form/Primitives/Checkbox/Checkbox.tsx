import React, { forwardRef, Ref, ReactElement } from 'react';
import { Checkbox as ReakitCheckbox, CheckboxProps } from 'reakit';
import classnames from 'classnames';

import useCheckboxState from '../../Field/Input/hooks/useCheckboxState';
import Label from '../Label/Label';

import styles from './Checkbox.module.scss';

type CheckboxType = Omit<CheckboxProps, 'type' | 'prefix'> & {
	label: string | ReactElement;
	id: string;
	indeterminate?: boolean;
};

const Checkbox = forwardRef((props: CheckboxType, ref: Ref<HTMLInputElement>) => {
	const {
		id,
		label,
		readOnly = false,
		disabled = false,
		checked,
		defaultChecked,
		indeterminate,
		...rest
	} = props;
	const checkboxState = useCheckboxState({
		state: (indeterminate && 'indeterminate') || checked || defaultChecked,
		readOnly: readOnly,
	});

	return (
		<span className={classnames(styles.checkbox, { [styles.checkbox_readOnly]: readOnly })}>
			<ReakitCheckbox
				{...checkboxState}
				type="checkbox"
				disabled={disabled}
				readOnly={readOnly}
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
