import cases from 'jest-in-case';
import customFormats from './customFormats';

describe('custom formats', () => {
	const mockedTranslation = {
		FORMAT_EMAIL: 'EMAIL ERROR',
		FORMAT_URL_HTTP_HTTPS: 'URL ERROR',
		FORMAT_URL_GIT: 'GIT URL ERROR',
		FORMAT_NO_LEADING_TRAILING_SPACE: 'NO LEADING ERROR',
		FORMAT_STRING_WITHOUT_SPACE: 'STRING WITHOUT SPACE ERROR',
		FORMAT_TIMESTAMP_OUT_OF_RANGE: 'TIMESTAMP OUT OF RANGE ERROR',
		FORMAT_ISO_DATETIME: 'ISO DATETIME ERROR',
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

		const resultSpaceOK = customValidation['url-http-https'](
			'https://test.domain.com/path%20with%20space',
		);
		// then
		expect(resultSpaceOK).toBe(null);

		const resultKO1 = customValidation['url-http-https']('ssh://test.domain.com');
		const resultKO2 = customValidation['url-http-https']('test.domain.com');
		const resultKO3 = customValidation['url-http-https']('https://test. domain.com');
		const resultKO4 = customValidation['url-http-https'](' https://test.domain.com');
		const resultKO5 = customValidation['url-http-https']('https://test.domain.com ');
		const resultKO6 = customValidation['url-http-https']('https://test.dom$ain.com ');
		const resultKO7 = customValidation['url-http-https']('https://test.domain.com/path with space');
		// then
		expect(resultKO1).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO2).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO3).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO4).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO5).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO6).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
		expect(resultKO7).toBe(mockedTranslation.FORMAT_URL_HTTP_HTTPS);
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

		const gitResultHttpOK12 = customValidation['url-git'](
			'https://host.xz:999/path%20space/to%20space',
		);
		expect(gitResultHttpOK12).toBe(null);

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

		const gitResultHttpKO6 = customValidation['url-git']('https://host.xz:999/path space/to space');
		expect(gitResultHttpKO6).toBe(mockedTranslation.FORMAT_URL_GIT);
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

		const gitResultSshOK13 = customValidation['url-git'](
			'ssh://190.22.21.12/~/path/to/repo%20with%20space/',
		);
		expect(gitResultSshOK13).toBe(null);

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

		const gitResultSshKO7 = customValidation['url-git'](
			'ssh://190.22.21.12/~/path/to/repo with space/',
		);
		expect(gitResultSshKO7).toBe(mockedTranslation.FORMAT_URL_GIT);
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

		const gitResultSshOK8 = customValidation['url-git'](
			'user@host.xz:port/path%20with%20space/more%20space/repo/',
		);
		expect(gitResultSshOK8).toBe(null);

		// TEST KO
		const gitResultSshKO1 = customValidation['url-git']('user@host.xz/path/to/repo.git/');
		expect(gitResultSshKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO2 = customValidation['url-git']('user@host.xz');
		expect(gitResultSshKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO3 = customValidation['url-git']('user@host.xz:/path/to/repo.git/');
		expect(gitResultSshKO3).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultSshKO4 = customValidation['url-git'](
			'user@host.xz:port/path with space/and plus character/repo/',
		);
		expect(gitResultSshKO4).toBe(mockedTranslation.FORMAT_URL_GIT);
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

		const gitResultGitOK7 = customValidation['url-git'](
			'git://1.1.1.1:9999/path%20with%20space/repo/',
		);
		expect(gitResultGitOK7).toBe(null);

		// TEST KO
		const gitResultGitKO1 = customValidation['url-git']('git://host.xz.git/');
		expect(gitResultGitKO1).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO2 = customValidation['url-git']('git://host~s.xz:999.git');
		expect(gitResultGitKO2).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO3 = customValidation['url-git']('git://user@host.xz:999/test.git');
		expect(gitResultGitKO3).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO4 = customValidation['url-git']('git://user@1.1.1.1:9999/path/to/repo.git');
		expect(gitResultGitKO4).toBe(mockedTranslation.FORMAT_URL_GIT);

		const gitResultGitKO5 = customValidation['url-git'](
			'git://1.1.1.1:9999/path with space/and plus character/repo/',
		);
		expect(gitResultGitKO5).toBe(mockedTranslation.FORMAT_URL_GIT);
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

	cases(
		'should validate a timestamp',
		({ testedValue, expectToBeValid }) => {
			const result = customValidation.timestamp(testedValue);

			if (expectToBeValid) {
				expect(result).toBe(null);
			} else {
				expect(result).toBe(mockedTranslation.FORMAT_TIMESTAMP_OUT_OF_RANGE);
			}
		},
		[
			{
				name: 'simple valid timestamp',
				testedValue: 46567832457,
				expectToBeValid: true,
			},
			{
				name: 'top range valid timestamp',
				testedValue: 8640000000000000,
				expectToBeValid: true,
			},
			{
				name: 'bottom range valid timestamp',
				testedValue: -8640000000000000,
				expectToBeValid: true,
			},
			{
				name: 'out of top range invalid timestamp',
				testedValue: 8640000000000001,
				expectToBeValid: false,
			},
			{
				name: 'out of bottom range invalid timestamp',
				testedValue: -8640000000000001,
				expectToBeValid: false,
			},
		],
	);

	cases(
		'should validate an iso datetime',
		({ testedValue, expectToBeValid }) => {
			const result = customValidation['iso-datetime'](testedValue);

			if (expectToBeValid) {
				expect(result).toBe(null);
			} else {
				expect(result).toBe(mockedTranslation.FORMAT_ISO_DATETIME);
			}
		},
		[
			{
				name: 'simple valid string',
				testedValue: '2018-04-28T12:33:42.452Z',
				expectToBeValid: true,
			},
			{
				name: 'invalid global format',
				testedValue: '2018-01-01T2:00:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'invalid month',
				testedValue: '2018-42-01T00:00:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'invalid day',
				testedValue: '2018-12-42T00:00:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'invalid minutes',
				testedValue: '2018-02-01T00:70:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'missing "T" separator between date and time',
				testedValue: '2018-02-01 00:00:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'missing "Z" for specied UTC time zone',
				testedValue: '2018-02-01T00:00:00.000',
				expectToBeValid: false,
			},
			{
				name: 'not handle comma separator for second fraction',
				testedValue: '2018-02-01T00:00:00,000Z',
				expectToBeValid: false,
			},
			{
				name: 'invalid date separator',
				testedValue: '2018 02 01T00:00:00.000Z',
				expectToBeValid: false,
			},
			{
				name: 'invalid time separator',
				testedValue: '2018-02-01T00 00 00.000Z',
				expectToBeValid: false,
			},
		],
	);
});
