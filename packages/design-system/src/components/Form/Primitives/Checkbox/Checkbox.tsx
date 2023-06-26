import { forwardRef, ReactElement, Ref, InputHTMLAttributes } from 'react';
import { ReactI18NextChild } from 'react-i18next';
import classnames from 'classnames';

import useCheckboxState from '../../../Form/Field/Input/hooks/useCheckboxState';
import Label from '../Label/Label';

import styles from './Checkbox.module.scss';
import { useId } from '../../../../useId';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	value?: string | number;
};

export type CheckboxPrimitiveType = Omit<CheckboxProps, 'type' | 'prefix'> & {
	id?: string;
	indeterminate?: boolean;
	label: string | ReactElement | ReactI18NextChild;
	isInline?: boolean;
	name: string;
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
	const checkboxId = useId(id, 'checkbox-');
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
			<input
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
