import customFormats from './customFormats';

describe('custom formats', () => {
	const mockedTranslation = {
		FORMAT_EMAIL: 'EMAIL ERROR',
		FORMAT_URL_HTTP_HTTPS: 'URL ERROR',
		FORMAT_NO_LEADING_TRAILING_SPACE: 'NO LEADING ERROR',
		FORMAT_STRING_WITHOUT_SPACE: 'STRING WITHOUT SPACE ERROR',
	};
	const customValidation = customFormats(key => mockedTranslation[key]);

	it('should validate an email', () => {
		const resultOK = customValidation.email('user@mail.com');
		// then
		expect(resultOK).toBe(null);

		const resultKO = customValidation.email('user.mail.com');
		// then
		expect(resultKO).toBe(mockedTranslation.FORMAT_EMAIL);
	});

	it('should validate an url with http or https', () => {
		const resultHttpOK = customValidation['url-http-https']('http://test.domain.com');
		// then
		expect(resultHttpOK).toBe(null);

		const resultHttpsOK = customValidation['url-http-https']('https://test.domain.com');
		// then
		expect(resultHttpsOK).toBe(null);

		const resultIpOK = customValidation['url-http-https']('http://127.0.0.1');
		// then
		expect(resultIpOK).toBe(null);

		const resultKO1 = customValidation['url-http-https']('ssh://test.domain.com');
		const resultKO2 = customValidation['url-http-https']('test.domain.com');
		const resultKO3 = customValidation['url-http-https']('https://test. domain.com');
		const resultKO4 = customValidation['url-http-https'](' https://test.domain.com');
		const resultKO5 = customValidation['url-http-https']('https://test.domain.com ');
		// then
		expect(resultKO1).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO2).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO3).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO4).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO5).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
	});

	it('should validate string with no leading and trailing space', () => {
		const resultOK = customValidation['no-leading-trailing-space']('no leading and trailing space');
		// then
		expect(resultOK).toBe(null);

		const resultLeadingKO = customValidation['no-leading-trailing-space']('no leading space ');
		// then
		expect(resultLeadingKO).toBe(mockedTranslation.FORMAT_NO_LEADING_TRAILING_SPACE);

		const resultTrailingKO = customValidation['no-leading-trailing-space'](' no trailing space');
		// then
		expect(resultTrailingKO).toBe(mockedTranslation.FORMAT_NO_LEADING_TRAILING_SPACE);
	});

	it('should validate a string without space', () => {
		const resultOK = customValidation['string-without-space']('test-sd');
		// then
		expect(resultOK).toBe(null);

		const resultKO1 = customValidation['string-without-space'](' ');
		const resultKO2 = customValidation['string-without-space'](' test');
		const resultKO3 = customValidation['string-without-space']('test ');
		const resultKO4 = customValidation['string-without-space']('te st');
		// then
		expect(resultKO1).toBe(mockedTranslation.FORMAT_STRING_WITHOUT_SPACE);
		expect(resultKO2).toBe(mockedTranslation.FORMAT_STRING_WITHOUT_SPACE);
		expect(resultKO3).toBe(mockedTranslation.FORMAT_STRING_WITHOUT_SPACE);
		expect(resultKO4).toBe(mockedTranslation.FORMAT_STRING_WITHOUT_SPACE);
	});
});
