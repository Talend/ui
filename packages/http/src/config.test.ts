import { HTTP, getDefaultConfig, setDefaultConfig, setDefaultLanguage } from './config';

describe('Configuration service', () => {
	describe('setDefaultLanguage', () => {
		beforeEach(() => {
			HTTP.defaultConfig = null;
		});

		afterEach(() => {
			HTTP.defaultConfig = null;
		});

		it('should not redefine the Accept Language if no defaultConfig', () => {
			expect(() => {
				setDefaultLanguage('ja');
			}).toThrow('');
		});

		it('should redefine the Accept Language', () => {
			setDefaultConfig({
				headers: {},
			});
			setDefaultLanguage('ja');

			expect(getDefaultConfig()).toEqual({ headers: { 'Accept-Language': 'ja' } });
		});

		it('should throw error on second call', () => {
			setDefaultConfig({
				headers: {},
			});

			expect(() => {
				setDefaultConfig({
					headers: {},
				});
			}).toThrow(
				'ERROR: setDefaultConfig should not be called twice, if you wish to change the language use setDefaultLanguage api.',
			);
		});
	});
});
