import React, { FocusEventHandler, useEffect, useRef } from 'react';
import Input, { InputProps } from './Input';

import useRevealPassword from './hooks/useRevealPassword';

const Password = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	const { currentType, onReset, RevealPasswordButton } = useRevealPassword();
	const isInitialMount = useRef<boolean>(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	return (
		<Input
			{...props}
			type={currentType}
			ref={ref || inputRef}
			onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
				if (props.onBlur) {
					props.onBlur(event);
				}
				inputRef.current = null;
				onReset();
			}}
			// @ts-ignore
			after={<RevealPasswordButton />}
		/>
	);
});

export default Password;
