import React, { useEffect, useRef } from 'react';
import Input from './Input';

import useRevealPassword from './hooks/useRevealPassword';

function Text(props) {
	const { currentType, RevealPasswordButton } = useRevealPassword();
	const inputRef = useRef();

	useEffect(() => {
		console.log(inputRef.current);
		inputRef.current?.focus();
	}, [currentType]);

	return <Input type={currentType} ref={inputRef} after={<RevealPasswordButton />} {...props} />;
}

export default Text;
