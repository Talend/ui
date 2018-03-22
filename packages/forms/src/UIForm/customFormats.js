import { defaultTranslate as t } from './lang';

const customFormats = {
	'no-leading-trailing-space': fieldData => {
		if (typeof fieldData === 'string' && /^\s|\s$/.test(fieldData)) {
			// return 'must be string without leading or trailing space';
			return t('NO_LEADING_TRAILING_SPACE', {
				defaultValue: 'must be string without leading or trailing space',
			});
		}
		return null;
	},
};

export default customFormats;
