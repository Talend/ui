import React, { useRef } from 'react';
import Input, { InputProps } from '../Input';

import useRevealPassword from '../hooks/useRevealPassword';

const Password = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	const { currentType, onReset, RevealPasswordButton } = useRevealPassword();
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleClick() {
		if (inputRef.current) {
			inputRef.current.focus();
			const valueLength = inputRef.current.value.length || 0;
			inputRef.current.setSelectionRange(valueLength, valueLength);
		}
	}

	return (
		<div ref={ref}>
			<Input
				{...props}
				type={currentType}
				ref={inputRef}
				onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
					onReset();
					if (props.onBlur) {
						props.onBlur(event);
					}
				}}
				after={<RevealPasswordButton onClick={() => handleClick()} disabled={props.disabled} />}
			/>
		</div>
	);
});

export default Password;
