import React, { forwardRef, Ref, ReactElement, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import Label from '../Label/Label';

import styles from './Radio.module.scss';

type RadioType = Omit<InputHTMLAttributes<any>, 'type' | 'prefix'> & {
	label: string | ReactElement;
	id: string;
};

const Radio = forwardRef((props: RadioType, ref: Ref<HTMLInputElement>) => {
	const { id, label, readOnly, disabled, ...rest } = props;

	return (
		<span className={classnames(styles.radio, { [styles.radio_readOnly]: readOnly })}>
			<input {...rest} type="radio" disabled={disabled || readOnly} ref={ref} id={id} />
			<Label htmlFor={id} inline>
				{label}
			</Label>
		</span>
	);
});

Radio.displayName = 'Radio';

export default Radio;
