const urlHttpOrHttpsRegexp = /^(http|https):\/\/\S+$/;
const stringWithoutSpaceRegExp = /^\S+$/g;
const emailRegExp = /^\S+@\S+$/g;

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
		if (typeof fieldData === 'string' && !urlHttpOrHttpsRegexp.test(fieldData)) {
			return t('FORMAT_URL_HTTP_HTTPS', {
				defaultValue: 'must be a valid url (e.g.: http://my.domain.com or https://my.domain.com)',
			});
		}
		return null;
	},
	'no-leading-trailing-space': fieldData => {
		if (typeof fieldData === 'string' && /^\s|\s$/.test(fieldData)) {
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
