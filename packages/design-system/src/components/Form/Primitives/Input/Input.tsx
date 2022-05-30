import React, {
	forwardRef,
	Ref,
	InputHTMLAttributes,
	useState,
	FocusEvent,
	useRef,
	useImperativeHandle,
	FocusEventHandler,
} from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import InputWrapper, { AffixesProps } from '../InputWrapper/InputWrapper';
import Tooltip from '../../../Tooltip';
import Clickable from '../../../Clickable';
import { Icon } from '../../../Icon/Icon';

type InputProps = Omit<InputHTMLAttributes<any>, 'prefix' | 'suffix'> & AffixesProps;

import styles from './Input.module.scss';

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement | null>) => {
	const {
		className,
		prefix,
		suffix,
		readOnly = false,
		disabled = false,
		type,
		onBlur,
		...rest
	} = props;

	// Password type management
	const [isClear, setClear] = useState<boolean>(type !== 'password');
	const inputType = type === 'password' && isClear ? 'text' : type;
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { t } = useTranslation();
	const showMsg = t('FORM_PASSWORD_SHOW', 'Show password');
	const hideMsg = t('FORM_PASSWORD_HIDE', 'Hide password');

	useImperativeHandle(ref, () => inputRef.current);

	function handleBlur(event: FocusEvent<HTMLInputElement, HTMLInputElement>) {
		setClear(false);
		if (onBlur) {
			onBlur(event);
		}
	}

	return (
		<InputWrapper prefix={prefix} suffix={suffix} disabled={disabled} readOnly={readOnly}>
			<>
				<input
					{...rest}
					type={inputType}
					ref={inputRef}
					disabled={disabled}
					readOnly={readOnly}
					onBlur={handleBlur}
					className={classnames(styles.input, { [styles.input_readOnly]: readOnly }, className)}
				/>
				{type === 'password' && (
					<Tooltip title={isClear ? hideMsg : showMsg}>
						<Clickable
							onClick={() => {
								setClear(!isClear);
								if (inputRef.current) {
									inputRef.current.focus();
									const valueLength = inputRef.current.value.length || 0;
									inputRef.current.setSelectionRange(valueLength, valueLength);
								}
							}}
							disabled={disabled}
							aria-pressed={isClear}
							tabIndex={-1}
							aria-hidden
							data-test="form.password.reveal"
							className={classnames(
								styles.button,
								{ [styles.button_readOnly]: readOnly },
								className,
							)}
						>
							<Icon
								name={isClear ? 'talend-eye-slash' : 'talend-eye'}
								className={styles.button__icon}
							/>
						</Clickable>
					</Tooltip>
				)}
			</>
		</InputWrapper>
	);
});

Input.displayName = 'Input';

export default Input;
