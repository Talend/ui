import React from 'react';
import Input from './Input';
import Button from './../../../Button';

import useRevealPassword from './hooks/useRevealPassword';

function Text(props) {
	const { currentType, RevealPasswordIcon, onReveal } = useRevealPassword();
	return (
		<Input
			type={currentType}
			button={
				<Button className="reveal__button" onClick={onReveal} tabIndex={-1} aria-hidden>
					<RevealPasswordIcon className="reveal__icon" />
				</Button>
			}
			{...props}
		/>
	);
}

export default Text;
