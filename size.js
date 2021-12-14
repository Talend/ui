const fs = require('fs');
const path = require('path');
const run = require('./run');
const originalSize = require('./size.json');

const THRESHOLD = 100;

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		let changed = false;
		const sizes = Object.values(workspaceInfo).reduce((acc, value) => {
			const dist = path.join(value.location, 'dist');
			if (fs.existsSync(path.join(value.location, 'dist'))) {
				fs.readdirSync(dist)
					.filter(f => f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.css'))
					.forEach(f => {
						const filePath = path.join(dist, f);
						const size = fs.statSync(filePath).size;
						const diff = Math.abs(originalSize[filePath] - size);
						if (diff > THRESHOLD) {
							changed = true;
							acc[filePath] = size;
						} else {
							acc[filePath] = originalSize[filePath];
						}
					});
			}
			return acc;
		}, {});
		if (changed) {
			fs.writeFileSync('./size.json', JSON.stringify(sizes));
		}
	});
