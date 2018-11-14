import api from '@talend/react-cmf';

import register from './register';
import DefaultCellRenderer from './components/DefaultCellRenderer';
import DefaultHeaderRenderer from './components/DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './components/DefaultPinHeaderRenderer';
import DefaultIntCellRenderer from './components/DefaultIntCellRenderer';

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
