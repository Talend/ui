export function randomUUID() {
	// works only on https so need  backport if the app is run on unsecure env
	if (crypto && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	function h(n: number) {
		return (n | 0).toString(16);
	}
	// backport using Math.random and Date
	function s(n: number) {
		return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n);
	}
	return [
		s(4) + s(4),
		s(4),
		'4' + s(3), // UUID version 4
		h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
		// s(4) + s(4) + s(4),
		Date.now().toString(16).slice(-10) + s(2), // Use timestamp to avoid collisions
	].join('-');
}
