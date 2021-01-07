import React, { useEffect, useRef } from 'react';
import Input from './Input';

import useRevealPassword from './hooks/useRevealPassword';

function Password(props) {
	const { currentType, onReset, RevealPasswordButton } = useRevealPassword();
	const isInitialMount = useRef(true);
	const inputRef = useRef();

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
			ref={inputRef}
			onBlur={event => {
				inputRef.current = null;
				onReset(event);
			}}
			after={<RevealPasswordButton />}
		/>
	);
}

export default Password;
