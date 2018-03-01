export function reverse(name, rev) {
	let className = name;
	if (rev) {
		className += ' reverse';
	}
	return className;
}
