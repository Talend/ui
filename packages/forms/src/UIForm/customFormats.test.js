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

		const resultHttpPortOK = customValidation['url-http-https']('http://test.domain.com:8080');
		// then
		expect(resultHttpPortOK).toBe(null);

		const resultIpPortOK = customValidation['url-http-https']('http://127.0.0.1:8080');
		// then
		expect(resultIpPortOK).toBe(null);

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

	it('should validate a git url http', () => {
		// TEST OK
		const gitResultHttpOK1 = customValidation['url-git']('http://host.xz/path/to/repo.git/');
		expect(gitResultHttpOK1).toBe(null);

		const gitResultHttpOK2 = customValidation['url-git']('https://host.xz/path/to/repo.git/');
		expect(gitResultHttpOK2).toBe(null);

		const gitResultHttpOK3 = customValidation['url-git']('http://host.xz/path/to/repo.git');
		expect(gitResultHttpOK3).toBe(null);

		const gitResultHttpOK4 = customValidation['url-git']('https://host.xz/path/to/repo.git');
		expect(gitResultHttpOK4).toBe(null);

		const gitResultHttpOK5 = customValidation['url-git']('http://host.xz/path/to/repo');
		expect(gitResultHttpOK5).toBe(null);

		const gitResultHttpOK6 = customValidation['url-git']('https://host.xz/path/to/repo');
		expect(gitResultHttpOK6).toBe(null);

		const gitResultHttpOK7 = customValidation['url-git']('https://host.xz:999/path/to/repo');
		expect(gitResultHttpOK7).toBe(null);

		const gitResultHttpOK8 = customValidation['url-git']('https://1.1.1.1/sd');
		expect(gitResultHttpOK8).toBe(null);

		const gitResultHttpOK9 = customValidation['url-git']('https://1.1.1.1:999/sd.git');
		expect(gitResultHttpOK9).toBe(null);

		const gitResultHttpOK10 = customValidation['url-git']('https://user@host.com:999/sd.git');
		expect(gitResultHttpOK10).toBe(null);

		const gitResultHttpOK11 = customValidation['url-git']('http://user@host.com:999/sd.git');
		expect(gitResultHttpOK11).toBe(null);

		// TEST KO
		const gitResultHttpKO1 = customValidation['url-git']('http://host.xz');
		expect(gitResultHttpKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultHttpKO2 = customValidation['url-git']('https://host.com/');
		expect(gitResultHttpKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultHttpKO3 = customValidation['url-git']('http://host.xz:999/');
		expect(gitResultHttpKO3).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultHttpKO4 = customValidation['url-git']('http://host.xz/~path/to/repo.git/');
		expect(gitResultHttpKO4).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultHttpKO5 = customValidation['url-git']('http://host~host.xz/path/to/repo.git/');
		expect(gitResultHttpKO5).toBe(mockedTranslation.FORMAT_URL_GIT);
	});

	it('should validate a git url ssh', () => {
		// TEST OK
		const gitResultSshOK1 = customValidation['url-git']('ssh://user@host.xz:999/path/to/repo.git/');
		expect(gitResultSshOK1).toBe(null);

		const gitResultSshOK2 = customValidation['url-git']('ssh://user@host.xz:999/path/to/repo.git');
		expect(gitResultSshOK2).toBe(null);

		const gitResultSshOK3 = customValidation['url-git'](
			'ssh://user@host.xz/~user/path/to/repo.git/',
		);
		expect(gitResultSshOK3).toBe(null);

		const gitResultSshOK4 = customValidation['url-git']('ssh://user@host.xz/path/to/repo.git');
		expect(gitResultSshOK4).toBe(null);

		const gitResultSshOK5 = customValidation['url-git']('ssh://user@1.1.1.1/path/to/repo.git');
		expect(gitResultSshOK5).toBe(null);

		const gitResultSshOK6 = customValidation['url-git']('ssh://user@1.1.1.1:999/path/to/repo.git');
		expect(gitResultSshOK6).toBe(null);

		const gitResultSshOK7 = customValidation['url-git']('ssh://host.xz:999/path/to/repo.git');
		expect(gitResultSshOK7).toBe(null);

		const gitResultSshOK8 = customValidation['url-git']('ssh://host.xz/path/to/repo.git/');
		expect(gitResultSshOK8).toBe(null);

		const gitResultSshOK9 = customValidation['url-git']('ssh://host.xz/~/path/to/repo.git');
		expect(gitResultSshOK9).toBe(null);

		const gitResultSshOK10 = customValidation['url-git']('ssh://190.22.21.12/~/path/to/repo.git');
		expect(gitResultSshOK10).toBe(null);

		const gitResultSshOK11 = customValidation['url-git']('ssh://190.22.21.12/~/path/to/repo');
		expect(gitResultSshOK11).toBe(null);

		const gitResultSshOK12 = customValidation['url-git']('ssh://190.22.21.12/~/path/to/repo/');
		expect(gitResultSshOK12).toBe(null);

		// TEST KO
		const gitResultSshKO1 = customValidation['url-git']('host.xz/~/path/to/repo.git');
		expect(gitResultSshKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO2 = customValidation['url-git']('ssh://host.xz');
		expect(gitResultSshKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO3 = customValidation['url-git']('ssh://host.xz.git');
		expect(gitResultSshKO3).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO4 = customValidation['url-git']('ssh://1.1.1.1.xz:999.git');
		expect(gitResultSshKO4).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO5 = customValidation['url-git']('ssh://user@1.1.1.1:/path/to/repo.git');
		expect(gitResultSshKO5).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO6 = customValidation['url-git']('ssh://user@host.xz:999path/to/repo.git/');
		expect(gitResultSshKO6).toBe(mockedTranslation.FORMAT_URL_GIT);
	});

	it('should validate a git url ssh 2', () => {
		// TEST OK
		const gitResultSshOK1 = customValidation['url-git']('user@host.xz:999/path/to/repo.git/');
		expect(gitResultSshOK1).toBe(null);

		const gitResultSshOK2 = customValidation['url-git']('user@host.xz:999/path/to/repo.git');
		expect(gitResultSshOK2).toBe(null);

		const gitResultSshOK3 = customValidation['url-git']('user@host.xz:~user/path/to/repo.git/');
		expect(gitResultSshOK3).toBe(null);

		const gitResultSshOK4 = customValidation['url-git']('user@host.xz:path/to/repo.git');
		expect(gitResultSshOK4).toBe(null);

		const gitResultSshOK5 = customValidation['url-git']('user@1.1.1.1:999/path/to/repo.git');
		expect(gitResultSshOK5).toBe(null);

		const gitResultSshOK6 = customValidation['url-git']('user@host.xz:path/to/repo');
		expect(gitResultSshOK6).toBe(null);

		const gitResultSshOK7 = customValidation['url-git']('user@host.xz:path/to/repo/');
		expect(gitResultSshOK7).toBe(null);

		// TEST KO
		const gitResultSshKO1 = customValidation['url-git']('user@host.xz/path/to/repo.git/');
		expect(gitResultSshKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO2 = customValidation['url-git']('user@host.xz');
		expect(gitResultSshKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO3 = customValidation['url-git']('user@host.xz:/path/to/repo.git/');
		expect(gitResultSshKO3).toBe(mockedTranslation.FORMAT_URL_GIT);
	});

	it('should validate a git url git', () => {
		// TEST OK
		const gitResultGitOK1 = customValidation['url-git']('git://host.xz/path/to/repo.git/');
		expect(gitResultGitOK1).toBe(null);

		const gitResultGitOK2 = customValidation['url-git']('git://1.1.1.1/path/to/repo.git');
		expect(gitResultGitOK2).toBe(null);

		const gitResultGitOK3 = customValidation['url-git']('git://host.xz:9999/path/to/repo.git/');
		expect(gitResultGitOK3).toBe(null);

		const gitResultGitOK4 = customValidation['url-git']('git://1.1.1.1:9999/path/to/repo.git');
		expect(gitResultGitOK4).toBe(null);

		const gitResultGitOK5 = customValidation['url-git']('git://1.1.1.1:9999/path/to/repo');
		expect(gitResultGitOK5).toBe(null);

		const gitResultGitOK6 = customValidation['url-git']('git://1.1.1.1:9999/path/to/repo/');
		expect(gitResultGitOK6).toBe(null);

		// TEST KO
		const gitResultGitKO1 = customValidation['url-git']('git://host.xz.git/');
		expect(gitResultGitKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO2 = customValidation['url-git']('git://host~s.xz:999.git');
		expect(gitResultGitKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO3 = customValidation['url-git']('git://user@host.xz:999/test.git');
		expect(gitResultGitKO3).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO4 = customValidation['url-git']('git://user@1.1.1.1:9999/path/to/repo.git');
		expect(gitResultGitKO4).toBe(mockedTranslation.FORMAT_URL_GIT);
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
