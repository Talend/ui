const run = require('../run');

run({ name: 'yarn', args: ['workspaces', '--silent', 'info'] })
	.then(info => JSON.parse(info))
	.then(workspaceInfo => {
		console.log(Object.keys(workspaceInfo).map(name => workspaceInfo[name].location));
	});
