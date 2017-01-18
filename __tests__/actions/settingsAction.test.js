import * as settings from '../../src/actions/settingsActions';

describe('CMF settinsActions', () => {
	it('should expose some CONSTANT', () => {
		expect(settings.REQUEST_SETTINGS).not.toBe(undefined);
		expect(settings.REQUEST_KO).not.toBe(undefined);
		expect(settings.REQUEST_OK).not.toBe(undefined);

		expect(typeof settings.REQUEST_SETTINGS).toBe('string');
		expect(typeof settings.REQUEST_KO).toBe('string');
		expect(typeof settings.REQUEST_OK).toBe('string');
	});

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
		expect(action.type).toBe(settings.REQUEST_SETTINGS);
		const data = {};
		action = settings.receiveSettings(data);
		expect(action.type).toBe(settings.REQUEST_OK);
		expect(action.settings).toBe(data);
		const message = 'Unexpected token } in JSON at position 232';
		const error = {
			message,
			stack: `SyntaxError: ${message}`,
		};
		action = settings.errorWithSettings(error);
		expect(action.type).toBe(settings.REQUEST_KO);
		expect(action.error.message).toBe(error.message);
		expect(action.error.stack).toBe(error.stack);
	});
});
