import {
	forwardRef,
	ReactElement,
	Ref,
	InputHTMLAttributes,
	useEffect,
	useRef,
	useImperativeHandle,
} from 'react';
import { ReactI18NextChild } from 'react-i18next';

import classnames from 'classnames';

import { useId } from '../../../../useId';
import Label from '../../Label';

import styles from './Checkbox.module.scss';

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

const CheckboxPrimitive = forwardRef(
	(props: CheckboxPrimitiveType, ref: Ref<HTMLInputElement | null>) => {
		const checkboxRef = useRef<HTMLInputElement | null>(null);
		// Forward ref to parent ref
		useImperativeHandle(ref, () => checkboxRef.current);

		const {
			id,
			label,
			readOnly = false,
			disabled = false,
			isInline = false,
			checked,
			indeterminate,
			onChange,
			...rest
		} = props;

		const checkboxId = useId(id, 'checkbox-');

		useEffect(() => {
			if (checkboxRef?.current) {
				checkboxRef.current.indeterminate = !!indeterminate;
			}
		}, [checkboxRef, indeterminate]);

		return (
			<div
				className={classnames(styles.checkbox, {
					[styles.checkbox_readOnly]: readOnly,
					[styles.checkbox_isInline]: isInline,
				})}
			>
				<input
					type="checkbox"
					disabled={disabled}
					readOnly={readOnly}
					ref={checkboxRef}
					id={checkboxId}
					checked={checked}
					aria-checked={indeterminate ? 'mixed' : checked}
					onChange={e => {
						onChange?.(e);
					}}
					{...rest}
				/>
				<Label htmlFor={checkboxId} inline>
					{label}
				</Label>
			</div>
		);
	},
);

CheckboxPrimitive.displayName = 'CheckboxPrimtive';

export default CheckboxPrimitive;
