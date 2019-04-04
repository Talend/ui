const users = require('./mock/infinite-scroll/users.json');

module.exports = function addRoutes(app) {
	app.get('/api/infinite-scroll/users', (req, res) => {
		const { startIndex, stopIndex, sortBy, sortDirection } = req.query;

		const multiplierDirection = sortDirection === 'ASC' ? 1 : -1;

		const items = [...users]
			// Sort by defined field
			.sort((a, b) => {
				let result;

				if (typeof a[sortBy] === 'number') {
					result = a[sortBy] - b[sortBy];
				} else {
					result = a[sortBy].localeCompare(b[sortBy]);
				}

				return result * multiplierDirection;
			})
			// Only get the chunk asked
			.slice(parseInt(startIndex, 10), parseInt(stopIndex, 10) + 1);

		res.json({ items, totalUserCount: users.length });
	});
};
