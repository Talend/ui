import cmf from '@talend/react-cmf';
import { registerAllContainers } from './register';

jest.mock('@talend/react-cmf', () => {
	const original = jest.requireActual('@talend/react-cmf');
	return {
		...original, // Pass down all the exported objects
		default: {
			...original.default,
			component: {
				registerMany: () => {},
			},
			cmfConnect: () => component => component,
			componentState: {},
		},
		__esModule: true,
	};
});

jest.mock('@talend/react-cmf-router', () => ({
	routerAPI: {
		selectors: {
			matchPath: jest.fn(),
			getPath: jest.fn(),
		},
		matchPath: jest.fn(),
	},
}));

describe('#register contianers', () => {
	it('should register all component', () => {
		cmf.component.registerMany = jest.fn();
		cmf.component.register = jest.fn();
		registerAllContainers();

		expect(cmf.component.registerMany.mock.calls.length).toBe(1);
	});
});
