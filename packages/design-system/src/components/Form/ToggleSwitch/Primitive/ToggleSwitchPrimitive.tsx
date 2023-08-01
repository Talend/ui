import { forwardRef } from 'react';
import type { Ref } from 'react';

import classnames from 'classnames';

import { useId } from '../../../../useId';
import { CheckboxPrimitiveType } from '../../Checkbox/Primitive/CheckboxPrimitive';

import styles from './ToggleSwitchPrimitive.module.scss';

export type ToggleSwitchPrimitiveType = CheckboxPrimitiveType;

const ToggleSwitchPrimitive = forwardRef(
	(
		{
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
		}: Omit<ToggleSwitchPrimitiveType, 'indeterminate'>,
		ref: Ref<HTMLInputElement>,
	) => {
		const switchId = useId(id, 'switch-');

		return (
			<span
				className={classnames(styles.switch, {
					[styles.switch_readOnly]: !!readOnly,
					[styles.switch_checked]: !!checked,
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
						aria-checked={checked}
						checked={checked}
						onChange={() =>
							// If readonly, we return current check status ; Else we return opposite status as new status
							onChange(Boolean(readOnly ? checked : !checked))
						}
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

ToggleSwitchPrimitive.displayName = 'ToggleSwitchPrimitive';

export default ToggleSwitchPrimitive;
