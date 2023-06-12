import { forwardRef, useState } from 'react';
import type { Ref } from 'react';
import { randomUUID } from '@talend/utils';
import classnames from 'classnames';

import useCheckboxState from './hooks/useCheckboxState';
import { CheckboxProps } from './Input.Checkbox';

import styles from './Input.ToggleSwitch.module.scss';

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
		const [uuid] = useState<string>(randomUUID());
		const switchId = id || `switch--${uuid}`;
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
