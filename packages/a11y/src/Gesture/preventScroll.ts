import { KeyboardEvent } from 'react';

export function preventScroll(evt: KeyboardEvent<HTMLElement>) {
	const arrows = [
		'ArrowLeft',
		'ArrowRight',
		'ArrowUp',
		'ArrowDown',
		'Home',
		'PageUp',
		'PageDown',
		// Arrow key management for old browsers
		'Left',
		'Right',
		'Up',
		'Down',
	];
	if (arrows.includes(evt.key)) {
		evt.preventDefault();
	}
}
