import api from '@talend/react-cmf';

import register from './register';

jest.mock('@talend/react-cmf', () => ({
	component: {
		registerMany: () => {},
	},
}));

jest.mock('./cmfModule', () => ({
	components: {
		foo: () => {},
	},
}));

describe('#register components', () => {
	it('should register all component', () => {
		api.component.registerMany = jest.fn();

		register();
		const calls = api.component.registerMany.mock.calls;
		expect(calls.length).toBe(1);
		expect(Object.keys(calls[0][0])).toEqual(['foo']);
	});
});
