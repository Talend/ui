const users = require('./mock/infinite-scroll/users.json');

module.exports = function addRoutes(app) {
	app.get('/api/infinite-scroll/users', (req, res) => {
		const { startIndex, stopIndex } = req.query;

		const items = users.slice(parseInt(startIndex, 10), parseInt(stopIndex, 10) + 1);

		res.json({ items, totalUserCount: users.length });
	});
};
