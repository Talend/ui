import React, { forwardRef, Ref, ReactElement, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import Label from '../Label/Label';
import useReadOnly from '../../../Form/Field/Input/hooks/useReadOnly';

import styles from './Radio.module.scss';

type RadioType = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> & {
	label: string;
	id: string;
};

const Radio = forwardRef((props: RadioType, ref: Ref<HTMLInputElement>) => {
	const { id, label, readOnly, disabled, defaultChecked, checked, ...rest } = props;
	const readOnlyRadioProps = useReadOnly(defaultChecked || checked);

	return (
		<span className={classnames(styles.radio, { [styles.radio_readOnly]: readOnly })}>
			<input
				{...rest}
				{...(readOnly ? readOnlyRadioProps : {})}
				type="radio"
				defaultChecked={defaultChecked}
				disabled={disabled}
				readOnly={readOnly}
				checked={checked}
				ref={ref}
				id={id}
			/>
			<Label htmlFor={id} inline>
				{label}
			</Label>
		</span>
	);
});

Radio.displayName = 'Radio';

export default Radio;
