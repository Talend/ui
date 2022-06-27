import { getI18n } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export default function getDefaultT() {
	return getI18n().t.bind(getI18n());
}
