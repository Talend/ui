import React, { forwardRef, ReactElement, Ref } from 'react';
import { Checkbox as ReakitCheckbox, CheckboxProps, unstable_useId as useId } from 'reakit';
import { ReactI18NextChild } from 'react-i18next';
import classnames from 'classnames';

import useCheckboxState from '../../../Form/Field/Input/hooks/useCheckboxState';
import Label from '../Label/Label';

import styles from './Checkbox.module.scss';

export type CheckboxPrimitiveType = Omit<CheckboxProps, 'type' | 'prefix'> & {
	id?: string;
	indeterminate?: boolean;
	label: string | ReactElement | ReactI18NextChild;
	isInline?: boolean;
};

const Checkbox = forwardRef((props: CheckboxPrimitiveType, ref: Ref<HTMLInputElement>) => {
	const {
		id,
		label,
		readOnly = false,
		disabled = false,
		isInline = false,
		checked,
		defaultChecked,
		indeterminate,
		...rest
	} = props;
	const { id: reakitId } = useId();
	const checkboxId = id || `checkbox--${reakitId}`;
	const state = (indeterminate && 'indeterminate') || defaultChecked || checked;
	const checkboxState = useCheckboxState({
		state,
		readOnly: readOnly,
	});

	return (
		<span
			className={classnames(styles.checkbox, {
				[styles.checkbox_readOnly]: readOnly,
				[styles.checkbox_isInline]: isInline,
			})}
		>
			<ReakitCheckbox
				{...checkboxState}
				type="checkbox"
				disabled={disabled}
				readOnly={readOnly}
				ref={ref}
				id={checkboxId}
				{...rest}
			/>
			<Label htmlFor={checkboxId} inline>
				{label}
			</Label>
		</span>
	);
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
