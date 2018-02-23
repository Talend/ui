import { api } from '@talend/react-cmf';

import register from './register';
import DefaultCellRenderer from './DefaultCellRenderer';
import DefaultHeaderRenderer from './DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './DefaultPinHeaderRenderer';
import DefaultStringCellRenderer from './DefaultStringCellRenderer/';
import DefaultIntCellRenderer from './DefaultIntCellRenderer';
import DefaultBooleanCellRenderer from './DefaultBooleanCellRenderer';
import DefaultDateCellRenderer from './DefaultDateCellRenderer';

jest.mock('@talend/react-cmf', () => ({
	api: {
		component: {
			register: () => {},
		},
	},
}));

describe('#register components', () => {
	it('should register all component', () => {
		api.component.register = jest.fn();

		register();

		expect(api.component.register.mock.calls.length).toBe(7);
		expect(api.component.register.mock.calls).toEqual([
			['DefaultCellRenderer', DefaultCellRenderer],
			['DefaultHeaderRenderer', DefaultHeaderRenderer],
			['DefaultPinHeaderRenderer', DefaultPinHeaderRenderer],
			['DefaultStringCellRenderer', DefaultStringCellRenderer],
			['DefaultIntCellRenderer', DefaultIntCellRenderer],
			['DefaultBooleanCellRenderer', DefaultBooleanCellRenderer],
			['DefaultDateCellRenderer', DefaultDateCellRenderer],
		]);
	});
});
