module.exports = new Proxy({}, {
	get: (target, key) => key !== '__esModule' && key,
});
