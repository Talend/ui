import { I18N_DOMAIN_COMPONENTS } from 'react-talend-components';
import i18n from 'i18next';

import I18N_DOMAIN_FORMS from '../../src/constants';

i18n
	.init({
		resources: {
			fr: {
				[I18N_DOMAIN_COMPONENTS]: {
					ENUMERATION_EMPTY_LIST: 'La liste est vide',
					ENUMERATION_HEADER_LABEL: 'Valeurs',
				},
				[I18N_DOMAIN_FORMS]: {
					ENUMERATION_WIDGET_VALIDATE_AND_ADD: 'Valider et ajouter',
					ENUMERATION_WIDGET_ADD_ITEM: 'Ajouter un document',
				},
			},
			it: {
				[I18N_DOMAIN_COMPONENTS]: {
					ENUMERATION_EMPTY_LIST: 'L\'elenco è vuoto',
					ENUMERATION_HEADER_LABEL: 'Valori',
				},
				[I18N_DOMAIN_FORMS]: {
					ENUMERATION_WIDGET_VALIDATE_AND_ADD: 'Convalida e aggiungi',
					ENUMERATION_WIDGET_ADD_ITEM: 'Aggiungi elemento',
				},
			},
		},
		debug: false,
		wait: true, // globally set to wait for loaded translations in translate hoc
	});


export default i18n;
