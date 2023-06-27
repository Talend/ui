import { forwardRef } from 'react';
import type { Ref } from 'react';
import classnames from 'classnames';

import useCheckboxState from './hooks/useCheckboxState';
import { CheckboxProps } from './Input.Checkbox';

import styles from './Input.ToggleSwitch.module.scss';
import { useId } from '../../../../useId';

const ToggleSwitch = forwardRef(
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
			...rest
		}: Omit<CheckboxProps, 'indeterminate'>,
		ref: Ref<HTMLInputElement>,
	) => {
		const switchId = useId(id, 'switch-');
		const checkbox = useCheckboxState({ state: defaultChecked || checked, readOnly });

		return (
			<span
				className={classnames(styles.switch, {
					[styles.switch_readOnly]: !!readOnly,
					[styles.switch_checked]: !!checkbox.state,
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
						aria-checked={checkbox.state === true}
						onChange={() => checkbox.setState(!checkbox.state)}
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

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
