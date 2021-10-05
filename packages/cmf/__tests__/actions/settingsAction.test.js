import * as settings from '../../src/actions/settingsActions';
import CONSTANT from '../../src/constant';

describe('CMF settinsActions', () => {
	it('should expose some function', () => {
		expect(settings.requestSettings).not.toBe(undefined);
		expect(settings.receiveSettings).not.toBe(undefined);
		expect(settings.errorWithSettings).not.toBe(undefined);
		expect(settings.fetchSettings).not.toBe(undefined);

		expect(typeof settings.requestSettings).toBe('function');
		expect(typeof settings.receiveSettings).toBe('function');
		expect(typeof settings.errorWithSettings).toBe('function');
		expect(typeof settings.fetchSettings).toBe('function');

		let action = settings.requestSettings();
		expect(action.type).toBe(CONSTANT.REQUEST_SETTINGS);
		const data = {};
		action = settings.receiveSettings(data);
		expect(action.type).toBe(CONSTANT.REQUEST_OK);
		expect(action.settings).toBe(data);
		const message = 'Unexpected token } in JSON at position 232';
		const error = {
			message,
			stack: `SyntaxError: ${message}`,
		};
		action = settings.errorWithSettings(error);
		expect(action.type).toBe(CONSTANT.REQUEST_KO);
		expect(action.error.message).toBe(error.message);
		expect(action.error.stack).toBe(error.stack);
	});

	it('should fetchSettings return action', () => {
		const action = settings.fetchSettings();
		expect(action.type).toBe('GET');
		expect(action.url).toBe('settings.json');
	});
});
