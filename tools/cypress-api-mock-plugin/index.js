const fs = require('fs/promises');
const { install, ensureBrowserFlags } = require('@neuralegion/cypress-har-generator');

function installApiMock(on, config) {
	install(on, config);

	on('task', {
		// remove all request in HAR that is not intercepted
		optimiseHar: async ({ harPath, interceptUrl }) => {
			const harContentAsString = await fs.readFile(harPath);
			const harContent = JSON.parse(harContentAsString);
			harContent.log.entries = harContent.log.entries
				.filter(({ request }) => request.url.match(new RegExp(interceptUrl)))
				.filter(({ response }) => response.status !== 0);
			await fs.writeFile(harPath, JSON.stringify(harContent));
			return null;
		},
	});
}

module.exports = { installApiMock, ensureBrowserFlags };
