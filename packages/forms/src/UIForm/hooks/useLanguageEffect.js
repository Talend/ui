import { useEffect } from 'react';
import tv4 from 'tv4';
import getLanguage from '../lang';
import customFormats from '../customFormats';

export default function useLanguageEffect({ customFormats: userCustomFormats, language, t }) {
	useEffect(() => {
		// control the tv4 language here.
		const mergedLanguage = getLanguage(t);
		if (language != null) {
			Object.assign(mergedLanguage, language);
			// Force update of language @talend even if already set
			tv4.addLanguage('@talend', mergedLanguage);
			tv4.language('@talend');
		}
		if (!tv4.language('@talend')) {
			tv4.addLanguage('@talend', mergedLanguage);
			tv4.language('@talend'); // set it
		}
		const allFormats = Object.assign(customFormats(t), userCustomFormats);
		tv4.addFormat(allFormats);
	}, [t]);
}
