import { api } from '@talend/react-cmf';
import { registerAllContainers } from './register';

jest.mock('@talend/react-cmf', () => ({
	api: {
		component: {
			registerMany: () => {},
		},
	},
	cmfConnect: () => component => component,
	componentState: {},
}));

describe('#register contianers', () => {
	it('should register all component', () => {
		api.component.registerMany = jest.fn();
		registerAllContainers();

		expect(api.component.registerMany.mock.calls.length).toBe(2);
	});
});
