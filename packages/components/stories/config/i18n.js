import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../src/constants';

i18n.use(initReactI18next).init({
	resources: {
		fr: {
			[I18N_DOMAIN_COMPONENTS]: {
				BUILD_ID: 'Identifiant',
				LIST_TOOLBAR_DISPLAY: 'Affichage :',
				LIST_TOOLBAR_SORT_BY: 'Trier par :',
				LIST_TOOLBAR_PAGINATION_SHOW: 'Nombre :',
				LIST_SELECT_ALL: 'Sélectionner',
				LIST_SELECT_SORT_BY_ORDER_ASC: 'Croissant',
				LIST_SELECT_SORT_BY_ORDER_DESC: 'Décroissant',
				LIST_SELECT_DISPLAY_MODE_TABLE: 'Tableau',
				LIST_SELECT_DISPLAY_MODE_LARGE: 'Large',
				LIST_FILTER_TOGGLE: 'Afficher le filtre',
				LIST_FILTER_REMOVE: 'Supprimer le filtre',
				LISTVIEW_NO_RESULT: 'Aucun résultat.',
				LISTVIEW_EMPTY: 'Cette liste est vide.',
				LISTVIEW_HEADER_TITLE: 'Valeurs',
				LISTVIEW_HEADER_SELECTED: '{{count}}/{{total}} élément sélectionné',
				LISTVIEW_HEADER_SELECTED_plural: '{{count}}/{{total}} éléments sélectionnés',
				LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER: 'Rechercher…',
				LISTVIEW_ITEMS_TOGGLE_ALL: 'Tout',
				ENUMERATION_EMPTY_LIST: 'La liste est vide',
				ENUMERATION_HEADER_LABEL: 'Valeurs',
				SIDEPANEL_EXPAND: 'Développer',
				SIDEPANEL_COLLAPSE: 'Réduire',
				VIRTUALIZEDLIST_NO_RESULT: 'Aucun résultat',
				DATE_FNS_ABOUT_MINUTE: '{{count}} minutes',
				GUIDEDTOUR_HELLO_WORD_HTML: 'Bonjour le monde<br>Vous pouvez changer de langue',
			},
		},
		it: {
			[I18N_DOMAIN_COMPONENTS]: {
				LIST_TOOLBAR_DISPLAY: 'Affissione :',
				LIST_TOOLBAR_SORT_BY: 'Ordina per :',
				LIST_TOOLBAR_PAGINATION_SHOW: 'Mostrare :',
				LIST_SELECT_ALL: 'Seleziona tutto',
				LIST_SELECT_SORT_BY_ORDER_ASC: 'Ascendente',
				LIST_SELECT_SORT_BY_ORDER_DESC: 'Discendente',
				LIST_SELECT_DISPLAY_MODE_TABLE: 'Tabella',
				LIST_SELECT_DISPLAY_MODE_LARGE: 'Grande',
				LIST_FILTER_TOGGLE: 'Ginocchiera filtro',
				LIST_FILTER_REMOVE: 'Rimuova il filtro',
				LISTVIEW_NO_RESULT: 'Nessun risultato.',
				LISTVIEW_EMPTY: 'Questa lista è vuota.',
				LISTVIEW_HEADER_TITLE: 'Valori',
				LISTVIEW_HEADER_SELECTED: '{{count}}/{{total}} articolo selezionato',
				LISTVIEW_HEADER_SELECTED_plural: '{{count}}/{{total}} articoli selezionati',
				LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER: 'Ricercare…',
				LISTVIEW_ITEMS_TOGGLE_ALL: 'Tutto',
				ENUMERATION_EMPTY_LIST: "L'elenco è vuoto",
				ENUMERATION_HEADER_LABEL: 'Valori',
				SIDEPANEL_EXPAND: 'Espandere',
				SIDEPANEL_COLLAPSE: 'Collassare',
				VIRTUALIZEDLIST_NO_RESULT: 'Nessun risultato',
				DATE_FNS_ABOUT_MINUTE: '{{count}} minuti',
				GUIDEDTOUR_HELLO_WORD_HTML: 'Ciao mondo<br>Puoi cambiare lingua',
			},
		},
	},
	debug: false,
	wait: true, // globally set to wait for loaded translations in translate hoc
});

export const LanguageSwitcher = () => {
	const style = {
		position: 'fixed',
		bottom: 0,
		width: '100vw',
		textAlign: 'center',
		zIndex: 1051,
	};

	function renderBtn(locale, isDefault) {
		return (
			<button className="btn" onClick={() => i18n.changeLanguage(locale)}>
				{locale} {isDefault && '(default)'}
			</button>
		);
	}

	return (
		<nav style={style}>
			<div className="btn-group" data-tour="language-switcher">
				{renderBtn('en', true)}
				{renderBtn('fr')}
				{renderBtn('it')}
			</div>
		</nav>
	);
};

export default i18n;
