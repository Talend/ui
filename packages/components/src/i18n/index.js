import I18N_DOMAIN_COMPONENTS from '../constants';
import getLocale from '../DateFnsLocale/locale';

// TODO 6.0 move DateFnsLocale folder under i18n folder
// TODO 6.0 move I18N_DOMAIN_COMPONENTS into this file so every component will import i18n.namespace (makes more sense)
export default {
	namespace: I18N_DOMAIN_COMPONENTS,
	getDateFnsLocale: getLocale,
};
