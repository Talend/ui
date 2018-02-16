import { api } from '@talend/react-cmf';

import register from './register';
import DefaultCellRenderer from './default-cell-renderer';
import DefaultHeaderRenderer from './default-header-renderer';
import DefaultPinHeaderRenderer from './default-pin-header-renderer';
import DefaultStringCellRenderer from './string-cell-renderer/';
import DefaultIntCellRenderer from './int-cell-renderer';
import DefaultBooleanCellRenderer from './boolean-cell-renderer';
import DefaultDateCellRenderer from './date-cell-renderer';

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

		// then
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
