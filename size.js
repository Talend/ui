const fs = require('fs');
const path = require('path');
const run = require('./run');
const originalSize = require('./size.json');

let THRESHOLD = 100;
if (process.env.THRESHOLD) {
	THRESHOLD = parseInt(process.env.THRESHOLD, 10);
}

const IGNORE_LIST = ['packages/playground'];

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		let changed = false;
		const sizes = Object.values(workspaceInfo).reduce((acc, value) => {
			if (IGNORE_LIST.includes(value.location)) {
				return acc;
			}
			const dist = path.join(value.location, 'dist');
			if (fs.existsSync(dist)) {
				fs.readdirSync(dist)
					.filter(f => f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.css'))
					.forEach(f => {
						const filePath = path.join(dist, f);
						const size = fs.statSync(filePath).size;
						const diff = Math.abs((originalSize[filePath] || 0) - size);
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
			fs.writeFileSync('./size.json', JSON.stringify(sizes, null, 2));
		}
	});
