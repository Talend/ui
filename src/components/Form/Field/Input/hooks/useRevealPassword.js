import React, { useState } from 'react';
import Icon from './../../../../Icon';

export default function useRevealPassword() {
	const [revealed, setRevealed] = useState(false);

	const currentType = revealed ? 'text' : 'password';

	function RevealPasswordIcon(props) {
		return <Icon name={revealed ? 'eye' : 'eyeSlash'} {...props} />;
	}

	function onReveal(event) {
		event.preventDefault();
		setRevealed(prevState => !prevState);
	}

	return { currentType, RevealPasswordIcon, onReveal };
}
