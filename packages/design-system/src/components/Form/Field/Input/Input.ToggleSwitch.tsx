import React from 'react';
import { Checkbox as ReakitCheckbox, unstable_useId as useId } from 'reakit';
import classnames from 'classnames';

import useCheckboxState from './hooks/useCheckboxState';
import { CheckboxProps } from './Input.Checkbox';

import styles from './Input.ToggleSwitch.module.scss';

const ToggleSwitch = React.forwardRef(
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
		ref: React.Ref<HTMLInputElement>,
	) => {
		const { id: reakitId } = useId();
		const switchId = id || `switch--${reakitId}`;
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
					{/*
					// ReakitCheckbox is not based on HTMLInputElement despite working like one
					// @ts-ignore */}
					<ReakitCheckbox
						id={switchId}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						{...rest}
						{...checkbox}
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
