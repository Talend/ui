import React, { useState } from 'react';
import { Icon } from './../../../../Icon';
import Button from '../../../../Button';

export default function useRevealPassword() {
	const [revealed, setRevealed] = useState(false);
	const currentType = revealed ? 'text' : 'password';

	function RevealPasswordButton(props) {
		return (
			<Button
				className="reveal__button"
				onMouseDown={onReveal}
				tabIndex={-1}
				aria-hidden
				{...props}
			>
				<Icon name={revealed ? 'talend-eye' : 'talend-eye-slash'} />
			</Button>
		);
	}

	function onReveal(event) {
		event.preventDefault();
		setRevealed(prevState => !prevState);
	}

	function onReset() {
		setRevealed(() => false);
	}

	return { currentType, onReset, RevealPasswordButton };
}
