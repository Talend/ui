import get from 'lodash/get';

const emailRegExp = /^[a-zA-Z][a-zA-Z0-9-.]+@[a-zA-Z-]+\.[a-zA-Z-]+$/;
const urlHttpOrHttpsRegExp = /^(http(s)?:\/\/)([a-zA-Z0-9.\-_]+)(:[0-9]+)?(\/[a-zA-Z0-9/.\-_%]+)?$/;
/* eslint-disable max-len */
// Format usable in regex101 : (?<http>^http(s)?\:\/\/)(?<userHTTP>[a-zA-Z0-9\.\-_]+\@)?(?<hostHTTP>[a-zA-Z0-9\.\-_]+)(?<portHTTP>:[0-9]+)?(?<pathHTTP>\/[a-zA-Z0-9\/\.\-_%]+)(?<extensionHTTP>\.git)?(?<slashHTTP>\/)?$
const urlGitProtocoltHttp = /(^http(s)?:\/\/)([a-zA-Z0-9.\-_]+@)?([a-zA-Z0-9.\-_]+)(:[0-9]+)?(\/[a-zA-Z0-9/.\-_%]+)(\.git)?(\/)?$/;
// Format usable in regex101 : (?<ssh>^ssh\:\/\/)(?<userSSH>[a-zA-Z0-9\.\-_]+\@)?(?<hostSSH>[a-zA-Z0-9\.\-_]+)(?<portSSH>:[0-9]+)?(?<pathSSH>\/[a-zA-Z0-9\/\.\-_~%]+)(?<extensionSSH>\.git)?(?<slashSSH>\/)?$
const urlGitProtocolSsh = /(^ssh:\/\/)([a-zA-Z0-9.\-_]+@)?([a-zA-Z0-9.\-_]+)(:[0-9]+)?(\/[a-zA-Z0-9/.\-_~%]+)(\.git)?(\/)?$/;
// Format usable in regex101 : (?<userSSH>^[a-zA-Z0-9\.\-_]+\@)(?<hostSSH>[a-zA-Z0-9\.\-_]+)(:)(?<portSSH>[0-9]+)?(?<pathSSH>[a-zA-Z0-9\.\-_~]+)(?<pathSSH2>\/[a-zA-Z0-9\/\.\-_~%]+)(?<extensionSSH>\.git)?(?<slashSSH>\/)?$
const urlGitProtocolSshScpLike = /(^[a-zA-Z0-9.\-_]+@)([a-zA-Z0-9.\-_]+)(:)([0-9]+)?([a-zA-Z0-9.\-_~]+)(\/[a-zA-Z0-9/.\-_~%]+)(\.git)?(\/)?$/;
// Format usable in regex101 : (?<git>^git\:\/\/)(?<hostGIT>[a-zA-Z0-9\.\-_]+)(?<portGIT>:[0-9]+)?(?<pathGIT>\/[a-zA-Z0-9\/\.\-_~%]+)(?<extensionGIT>\.git)?(?<slashGIT>\/)?$
const urlGitProtocolGit = /(^git:\/\/)([a-zA-Z0-9.\-_]+)(:[0-9]+)?(\/[a-zA-Z0-9/.\-_~%]+)(\.git)?(\/)?$/;
/* eslint-disable max-len */

const urlGit = new RegExp(
	`${urlGitProtocoltHttp.source}|${urlGitProtocolSsh.source}|${urlGitProtocolSshScpLike.source}|${urlGitProtocolGit.source}`,
);

// EcmaScript ISO 8601 Extended Format: https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
// Only handle full string (date and time with full second fraction) and only UTC timezone
export const isoDateTimeRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const leadingTralingSpaceRegExp = /^\s|\s$/;
const stringWithoutSpaceRegExp = /^\S+$/;

const MAX_TIMESTAMP = 8640000000000000;

function isValidDate(rawString) {
	const date = new Date(rawString);
	return !isNaN(date.getTime());
}

const getFormats = t => ({
	email: fieldData => {
		if (typeof fieldData === 'string' && !emailRegExp.test(fieldData)) {
			return t('FORMAT_EMAIL', {
				defaultValue: 'must be a valid email (e.g.: user@company.com)',
			});
		}
		return null;
	},
	'url-http-https': fieldData => {
		if (typeof fieldData === 'string' && !urlHttpOrHttpsRegExp.test(fieldData)) {
			return t('FORMAT_URL_HTTP_HTTPS', {
				defaultValue: 'must be a valid url (e.g.: http://my.domain.com or https://my.domain.com)',
			});
		}
		return null;
	},
	'url-git': fieldData => {
		if (typeof fieldData === 'string' && !urlGit.test(fieldData)) {
			return t('FORMAT_URL_GIT', {
				defaultValue:
					'must be a valid HTTP URL (e.g.: http(s)://host[:port]/my-repo[.git]), SSH URL (e.g.: [ssh://][user@]host:[port/]my-repo[.git]) or GIT URL (e.g.: git://host[:port]/my-repo[.git])',
			});
		}
		return null;
	},
	'no-leading-trailing-space': fieldData => {
		if (typeof fieldData === 'string' && leadingTralingSpaceRegExp.test(fieldData)) {
			return t('FORMAT_NO_LEADING_TRAILING_SPACE', {
				defaultValue: 'must be a string without leading or trailing space',
			});
		}
		return null;
	},
	'string-without-space': fieldData => {
		if (typeof fieldData === 'string' && !stringWithoutSpaceRegExp.test(fieldData)) {
			return t('FORMAT_STRING_WITHOUT_SPACE', {
				defaultValue: 'must be a string without space',
			});
		}
		return null;
	},
	timestamp: fieldData => {
		if (typeof fieldData === 'number' && Math.abs(fieldData) > MAX_TIMESTAMP) {
			return t('FORMAT_TIMESTAMP_OUT_OF_RANGE', {
				defaultValue: 'must be a valid timestamp',
			});
		}
		return null;
	},
	'iso-datetime': fieldData => {
		if (typeof fieldData !== 'string') {
			return null;
		}

		const formatMatches = isoDateTimeRegExp.test(fieldData);
		if (formatMatches && isValidDate(fieldData)) {
			return null;
		}

		return t('FORMAT_ISO_DATETIME', {
			defaultValue: 'must be a valid ISO 8601 datetime (e.g.: 2018-01-01T00:00:00.000Z)',
		});
	},
});

export default function formatsRules(schema, t) {
	const format = get(schema, 'schema.format');
	return format ? getFormats(t)[format] : () => {};
}
