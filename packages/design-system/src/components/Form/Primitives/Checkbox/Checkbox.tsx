import {
	forwardRef,
	InputHTMLAttributes,
	ReactElement,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';

import classnames from 'classnames';

import { useControl } from '../../../../useControl';
import { useId } from '../../../../useId';
import Label from '../../Label';

import styles from './Checkbox.module.scss';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	value?: string | number;
};

export type CheckboxPrimitiveType = Omit<CheckboxProps, 'type' | 'prefix'> & {
	id?: string;
	indeterminate?: boolean;
	label: string | ReactElement;
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

		const controlled = useControl<boolean>(props, {
			onChangeKey: 'onChange',
			valueKey: 'checked',
			defaultValueKey: 'defaultChecked',
			selector: e => e.target.checked,
			defaultValue: false,
		});

		useEffect(() => {
			// indeterminate is a controlled value only
			if (checkboxRef?.current) {
				checkboxRef.current.indeterminate = !!indeterminate;
			}
		}, [checkboxRef, indeterminate, controlled.value]);

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
					aria-checked={indeterminate ? 'mixed' : controlled.value}
					checked={controlled.value}
					onChange={e => controlled.onChange(e)}
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
