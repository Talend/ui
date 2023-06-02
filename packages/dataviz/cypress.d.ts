declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to select DOM element by data-cy attribute.
			 * @example cy.dataCy('greeting')
			 */
			mount: typeof mount;
		}
	}
}

declare module '@talend/scripts-config-react-webpack/config/webpack.config.common';
