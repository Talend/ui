import customFormats from './customFormats';

describe('custom formats', () => {
	const mockedTranslation = {
		FORMAT_EMAIL: 'EMAIL ERROR',
		FORMAT_URL_HTTP_HTTPS: 'URL ERROR',
		FORMAT_URL_GIT: 'GIT URL ERROR',
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

		const resultKO2 = customValidation.email('user&@mail.com');
		// then
		expect(resultKO2).toBe(mockedTranslation.FORMAT_EMAIL);
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
		const resultKO6 = customValidation['url-http-https']('https://test.dom$ain.com ');
		// then
		expect(resultKO1).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO2).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO3).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO4).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO5).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO6).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
	});

	it('should validate a git url', () => {
		const resultHttpOK = customValidation['url-git']('http://test.domain.com/repo');
		// then
		expect(resultHttpOK).toBe(null);

		const resultHttpsOK = customValidation['url-git']('https://test.domain.com/repo');
		// then
		expect(resultHttpsOK).toBe(null);

		const resultIpOK = customValidation['url-git']('http://127.0.0.1/repo');
		// then
		expect(resultIpOK).toBe(null);

		const resultSshOK = customValidation['url-git']('user@host:1234/repos/myrepo.git');
		// then
		expect(resultSshOK).toBe(null);

		const resultSsh2OK = customValidation['url-git']('user@host.com:repos/myrepo.git');
		// then
		expect(resultSsh2OK).toBe(null);

		const resultSsh3OK = customValidation['url-git']('ssh://user@host.com:repos/myrepo.git');
		// then
		expect(resultSsh3OK).toBe(null);

		const resultKO1 = customValidation['url-git']('http://test.domain.com');
		const resultKO2 = customValidation['url-git']('https://test.domain.com');
		const resultKO3 = customValidation['url-git']('user@host:1234/repos/myrepo');
		const resultKO4 = customValidation['url-git']('user@host.com:repos/myrepo');
		const resultKO5 = customValidation['url-git']('ssh://user@host.com:repos/myrepo ');
		// then
		expect(resultKO1).toBe(mockedTranslation.FORMAT_URL_GIT);
		expect(resultKO2).toBe(mockedTranslation.FORMAT_URL_GIT);
		expect(resultKO3).toBe(mockedTranslation.FORMAT_URL_GIT);
		expect(resultKO4).toBe(mockedTranslation.FORMAT_URL_GIT);
		expect(resultKO5).toBe(mockedTranslation.FORMAT_URL_GIT);
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
