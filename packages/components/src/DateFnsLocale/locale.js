import buildDistanceInWordsLocale from './distanceInWords';
import { getCurrentLanguage } from '../translate';

let language;
let locale;

export default function getLocale(t) {
	const currentlanguage = getCurrentLanguage();
	if (language !== currentlanguage) {
		locale = {
			distanceInWords: buildDistanceInWordsLocale(t),
		};
		language = getCurrentLanguage();
	}

	return locale;
}
