import * as dateFNSLocales from 'date-fns/locale';
import i18next from 'i18next';

import { getCurrentLanguage } from '../../translate';

let language;
let locale;

export default function getLocale() {
	const currentlanguage = getCurrentLanguage();
	if (language !== currentlanguage) {
		// See https://github.com/date-fns/date-fns/blob/main/docs/upgradeGuide.md
		// Locales renamed:
		// en → en-US
		// zh_cn → zh-CN
		// zh_tw → zh-TW
		let fnsLanguage = currentlanguage;
		if (fnsLanguage === 'en') {
			fnsLanguage = 'enUS';
		} else if (fnsLanguage === 'zh_cn') {
			fnsLanguage = 'zhCN';
		} else if (fnsLanguage === 'zh_tw') {
			fnsLanguage = 'zhTW';
		}
		locale = dateFNSLocales[fnsLanguage || i18next.language];
		language = currentlanguage;
	}

	return locale;
}
// formatDistanceToNow
