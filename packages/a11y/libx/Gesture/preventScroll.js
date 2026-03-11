function preventScroll(evt) {
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
export { preventScroll };
//# sourceMappingURL=preventScroll.js.map
