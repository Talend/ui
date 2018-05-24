import cmf from '@talend/react-cmf';
import { registerAllContainers } from './register';

jest.mock('@talend/react-cmf', () => ({
	component: {
		registerMany: () => {},
		register: () => {},
		has: () => false,
	},
	cmfConnect: () => component => component,
	componentState: {},
}));

describe('#register contianers', () => {
	it('should register all component', () => {
		cmf.component.registerMany = jest.fn();
		cmf.component.register = jest.fn();
		registerAllContainers();

		expect(cmf.component.registerMany.mock.calls.length).toBe(1);
		expect(cmf.component.register).toHaveBeenCalled();
	});
});
