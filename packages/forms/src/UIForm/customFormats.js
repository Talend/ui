const emailRegExp = /[a-zA-Z][a-zA-Z0-9-.]+@[a-zA-Z-]+\.[a-zA-Z-]+/;
const urlHttpOrHttpsRegExp = /^(http|https):\/\/[a-zA-Z0-9.\-/_]+$/;
// eslint-disable-next-line max-len
const urlGit = /(http:\/\/[a-zA-Z0-9.\-_:]+\/[a-zA-Z0-9.\-/_]+)|(https:\/\/[a-zA-Z0-9.\-_:]+\/[a-zA-Z0-9.\-/_]+)|(ssh:\/\/[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+:[a-zA-Z0-9.\-/_]+\.git\b)|([a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+:[a-zA-Z0-9.\-/_]+\.git\b)/;
const leadingTralingSpaceRegExp = /^\s|\s$/;
const stringWithoutSpaceRegExp = /^\S+$/;

const customFormats = t => ({
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
					'must be a valid url http (e.g.: http(s)://my.domain.com/my-repo(.git)) or  ssh (e.g. ssh://user@host/my-repo.git)',
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
});

export default customFormats;
