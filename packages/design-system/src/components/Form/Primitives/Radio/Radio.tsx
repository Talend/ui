import { forwardRef, InputHTMLAttributes, Ref, useState } from 'react';
import { randomUUID } from '@talend/utils';

import classnames from 'classnames';
import Label from '../Label/Label';
import useReadOnly from '../../../Form/Field/Input/hooks/useReadOnly';

import styles from './Radio.module.scss';

export type RadioPrimitiveType = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix'> & {
	label: string;
	id?: string;
};

const Radio = forwardRef((props: RadioPrimitiveType, ref: Ref<HTMLInputElement>) => {
	const { id, label, readOnly, disabled, defaultChecked, checked, ...rest } = props;
	const [uuid] = useState<string>(randomUUID());
	const radioId = id || `checkbox--${uuid}`;
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
				id={radioId}
			/>
			<Label htmlFor={radioId} inline>
				{label}
			</Label>
		</span>
	);
});

Radio.displayName = 'Radio';

export default Radio;
