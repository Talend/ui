import '@neuralegion/cypress-har-generator/commands';
import path from 'path';

import { getHarHandler } from './har';

const HAR_FOLDER = './cypress/api-mock';
const DEFAULT_INTERCEPT_URL = `${Cypress.config('baseUrl')}/(api|gateway)/*`;
const harFileName = fileName => `${path.basename(fileName).split('.')[0]}.har`;

function getFileNames(options) {
	const fileName = harFileName(options.fileName || Cypress.spec.name);
	return {
		fileName,
		harPath: `./${path.join(HAR_FOLDER, fileName)}`,
	};
}

export function installApiMockCommands(options = {}) {
	const { interceptUrl = DEFAULT_INTERCEPT_URL, modifyResponse = resp => resp } = options;
	const harHandlers = {};
	const recordMode = Cypress.env('record-api');

	if (recordMode) {
		Cypress.Commands.add('beforeApiMock', (options = {}) => {
			cy.recordHar({ options });
		});

		Cypress.Commands.add('afterApiMock', (options = {}) => {
			const { fileName, harPath } = getFileNames(options);
			cy.saveHar({ outDir: HAR_FOLDER, fileName, ...options });
			cy.task('optimiseHar', {
				interceptUrl,
				harPath,
			});
		});
	} else {
		// Load the corresponding har before executing the test file
		Cypress.Commands.add('beforeApiMock', (options = {}) => {
			const fileName = harFileName(options.fileName || Cypress.spec.name);
			const harPath = `./${path.join(HAR_FOLDER, fileName)}`;
			cy.readFile(harPath)
				.then(harContent => JSON.parse(harContent))
				.then(harContent => {
					harHandlers[Cypress.spec.name] = getHarHandler(harContent);
				});
		});

		// remove the corresponding har after execution to free some memory
		Cypress.Commands.add('afterApiMock', () => {
			delete harHandlers[Cypress.spec.name];
		});

		// Intercept the http requests (filtered by options.interceptUrl) and delegate the response to har handler
		beforeEach(() => {
			const getResponse = harHandlers[Cypress.spec.name];
			cy.intercept({ url: new RegExp(interceptUrl) }, req => {
				const url = new URL(req.url);
				const search = url.search.substring(1);
				const request = {
					method: req.method,
					path: url.pathname,
					params: search
						? JSON.parse(
								`{"${search.replace(/\+/g, ' ').replace(/&/g, '","').replace(/=/g, '":"')}"}`,
								(key, value) => (key === '' ? value : decodeURIComponent(value)),
						  )
						: {},
					body: req.body,
				};
				const response = getResponse(request);
				req.reply(
					modifyResponse({
						statusCode: response.status,
						body: response.content.text,
						headers: { 'Content-Type': response.content.mimeType },
					}),
				);
			});
		});
	}
}
