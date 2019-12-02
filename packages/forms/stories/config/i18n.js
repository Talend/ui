import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '@talend/react-components/lib/constants';

import { I18N_DOMAIN_FORMS } from '../../src/UIForm-v2/constants';

i18n.use(initReactI18next).init({
	resources: {
		fr: {
			[I18N_DOMAIN_COMPONENTS]: {
				ENUMERATION_EMPTY_LIST: 'La liste est vide',
				ENUMERATION_HEADER_LABEL: 'Valeurs',
				LISTVIEW_NO_RESULT: 'Aucun résultat.',
				LISTVIEW_EMPTY: 'Cette liste est vide.',
				LISTVIEW_HEADER_TITLE: 'Valeurs',
				LISTVIEW_HEADER_SELECTED: '{{count}}/{{total}} élément sélectionné',
				LISTVIEW_HEADER_SELECTED_plural: '{{count}}/{{total}} éléments sélectionnés',
				LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER: 'Rechercher…',
				LISTVIEW_ITEMS_TOGGLE_ALL: 'Tout',
			},
			[I18N_DOMAIN_FORMS]: {
				ENUMERATION_WIDGET_VALIDATE_AND_ADD: 'Valider et ajouter',
				ENUMERATION_WIDGET_ADD_ITEM: 'Ajouter un document',
				LISTVIEW_WIDGET_SEARCH: 'Rechercher',
				LISTVIEW_WIDGET_ABORT: 'Annuler',
			},
		},
		it: {
			[I18N_DOMAIN_COMPONENTS]: {
				ENUMERATION_EMPTY_LIST: "L'elenco è vuoto",
				ENUMERATION_HEADER_LABEL: 'Valori',
				LISTVIEW_NO_RESULT: 'Nessun risultato.',
				LISTVIEW_EMPTY: 'Questa lista è vuota.',
				LISTVIEW_HEADER_TITLE: 'Valori',
				LISTVIEW_HEADER_SELECTED: '{{count}}/{{total}} articolo selezionato',
				LISTVIEW_HEADER_SELECTED_plural: '{{count}}/{{total}} articoli selezionati',
				LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER: 'Ricercare…',
				LISTVIEW_ITEMS_TOGGLE_ALL: 'Tutto',
			},
			[I18N_DOMAIN_FORMS]: {
				ENUMERATION_WIDGET_VALIDATE_AND_ADD: 'Convalida e aggiungi',
				ENUMERATION_WIDGET_ADD_ITEM: 'Aggiungi elemento',
				LISTVIEW_WIDGET_SEARCH: 'Ricercare',
				LISTVIEW_WIDGET_ABORT: 'Annulla',
			},
		},
	},
	debug: false,
	wait: true, // globally set to wait for loaded translations in translate hoc
});

export default i18n;
