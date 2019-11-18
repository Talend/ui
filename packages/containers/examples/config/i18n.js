import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18N_DOMAIN_COMPONENTS } from '@talend/react-components';
import I18N_DOMAIN_CONTAINERS from '../../src/constant';

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: {
			[I18N_DOMAIN_CONTAINERS]: {
				DELETE_RESOURCE_YES: 'Of Course',
				DELETE_RESOURCE_NO: 'OH NO!',
				DELETE_RESOURCE_MESSAGE:
					'Are you sure you want to remove the <1>{{resourceType}}</1> <3><0>{{label}}</0></3> ?',
				DELETE_RESOURCE_MESSAGE_female:
					'Are you sure you want to remove the <1>{{resourceType}}</1> <3><0>{{label}}</0></3> ?',
			},
		},
		fr: {
			[I18N_DOMAIN_COMPONENTS]: {
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
				VIRTUALIZEDLIST_NO_RESULT: 'Pas de résultat',
			},
			[I18N_DOMAIN_CONTAINERS]: {
				DELETE_RESOURCE_YES: 'Bien sûr',
				DELETE_RESOURCE_NO: 'Meh non',
				DELETE_RESOURCE_MESSAGE:
					'Êtes-vous sûr(e) de vouloir supprimer le <1>{{resourceType}}</1> <3><0>{{label}}</0></3> ?',
				DELETE_RESOURCE_MESSAGE_female:
					'Êtes-vous sûr(e) de vouloir supprimer la <1>{{resourceType}}</1> <3><0>{{label}}</0></3> ?',
				DELETE_RESOURCE_QUESTION_MARK: ' ?',
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
				VIRTUALIZEDLIST_NO_RESULT: 'Nessun risultato',
			},
			[I18N_DOMAIN_CONTAINERS]: {
				DELETE_RESOURCE_MESSAGE: 'Sei sicuro di voler eliminare {{resourceLabel}}',
				DELETE_RESOURCE_QUESTION_MARK: '?',
			},
		},
	},
	saveMissing: true,
	debug: true,
	wait: true, // globally set to wait for loaded translations in translate hoc
});

export const LanguageSwitcher = () => {
	const style = {
		position: 'fixed',
		bottom: 0,
		width: '100vw',
		textAlign: 'center',
		zIndex: 100000,
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
			<div className="btn-group">
				{renderBtn('en', true)}
				{renderBtn('fr')}
			</div>
		</nav>
	);
};

export default i18n;
