module.exports = new Proxy(
	{},
	{
		get: (target, key) => key !== '__esModule' && `theme-${key}`,
	},
);
