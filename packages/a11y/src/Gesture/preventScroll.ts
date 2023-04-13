import keycode from 'keycode';
import { KeyboardEvent } from 'react';

export function preventScroll(evt: KeyboardEvent<HTMLElement>) {
	const arrows = [
		keycode.codes.left,
		keycode.codes.right,
		keycode.codes.up,
		keycode.codes.down,
		keycode.codes.home,
		keycode.codes['page up'],
		keycode.codes['page down'],
	];
	if (arrows.includes(evt.keyCode)) {
		evt.preventDefault();
	}
}
