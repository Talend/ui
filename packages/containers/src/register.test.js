import cmf from '@talend/react-cmf';
import { registerAllContainers } from './register';

jest.mock('@talend/react-cmf', () => ({
	component: {
		registerMany: () => {},
	},
	cmfConnect: () => component => component,
	componentState: {},
}));

jest.mock('@talend/react-cmf-router', () => ({
	routerAPI: {
		selectors: {
			matchPath: jest.fn(),
			getPath: jest.fn(),
		},
		matchPath: jest.fn(),
	},
}));

describe('#register containers', () => {
	it('should register all component', () => {
		cmf.component.registerMany = jest.fn();
		cmf.component.register = jest.fn();
		registerAllContainers();

		expect(cmf.component.registerMany.mock.calls.length).toBe(1);
	});
});
