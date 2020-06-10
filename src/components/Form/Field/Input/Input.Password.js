import React, { useEffect, useRef } from 'react';
import Input from './Input';

import useRevealPassword from './hooks/useRevealPassword';

function Text(props) {
	const { currentType, resetType, RevealPasswordButton } = useRevealPassword();
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, [currentType]);

	return (
		<Input
			type={currentType}
			ref={inputRef}
			onBlur={resetType}
			after={<RevealPasswordButton />}
			{...props}
		/>
	);
}

export default Text;
