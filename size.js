const fs = require('fs');
const path = require('path');
const run = require('./run');
const originalSize = require('./size.json');

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		let changed = false;
		const sizes = Object.values(workspaceInfo).reduce((acc, value) => {
			const dist = path.join(value.location, 'dist');
			if (fs.existsSync(dist)) {
				fs.readdirSync(dist)
					.filter(f => f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.css'))
					.forEach(f => {
						const filePath = path.join(dist, f);
						const size = fs.statSync(filePath).size;
						const diff = Math.abs(originalSize[filePath] - size);
						console.log('size diff', diff, size);
						if (diff > (process.env.THRESHOLD || 100)) {
							changed = true;
							console.log('changed');
							acc[filePath] = size;
						} else {
							acc[filePath] = originalSize[filePath];
						}
					});
			}
			return acc;
		}, {});
		if (changed) {
			console.log('save');
			fs.writeFileSync('./size.json', JSON.stringify(sizes, null, 2));
		}
	});
