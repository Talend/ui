declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

declare module '@talend/scripts-config-react-webpack/config/webpack.config.common';
