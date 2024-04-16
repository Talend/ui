import { forwardRef } from 'react';
import type { ChangeEvent, Ref } from 'react';

import classnames from 'classnames';

import { useControl } from '../../../../useControl';
import { useId } from '../../../../useId';
import { CheckboxPrimitiveType } from '../../Primitives';
import styles from './Input.ToggleSwitch.module.css';

export type ToggleSwitchPropTypes = Omit<CheckboxPrimitiveType, 'onChange'> & {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ToggleSwitch = forwardRef(
	(props: Omit<ToggleSwitchPropTypes, 'indeterminate'>, ref: Ref<HTMLInputElement>) => {
		const {
			id,
			label,
			defaultChecked,
			checked,
			readOnly,
			disabled,
			required,
			children,
			isInline,
			onChange,
			...rest
		} = props;
		const switchId = useId(id, 'switch-');
		const controlled = useControl<boolean>(props, {
			onChangeKey: 'onChange',
			valueKey: 'checked',
			defaultValueKey: 'defaultChecked',
			selector: e => e.target.checked,
			defaultValue: false,
		});

		return (
			<span
				className={classnames(styles.switch, {
					[styles.switch_readOnly]: !!readOnly,
					[styles.switch_checked]: controlled.value,
					[styles.switch_disabled]: !!disabled,
					[styles.switch_inline]: !!isInline,
				})}
			>
				<label htmlFor={switchId} style={readOnly ? { pointerEvents: 'none' } : {}}>
					<input
						type="checkbox"
						id={switchId}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						aria-checked={controlled.value}
						checked={controlled.value}
						onChange={e => controlled.onChange(e)}
						{...rest}
						ref={ref}
					/>
					<span className={styles.legend}>
						{label || children}
						{required && '*'}
					</span>
				</label>
			</span>
		);
	},
);

ToggleSwitch.displayName = 'ToggleSwitchPrimitive';
