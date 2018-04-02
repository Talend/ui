import React from 'react';
import { changeLanguage, init } from 'i18next'; // eslint-disable-line import/no-extraneous-dependencies
import i18n, { I18N_DOMAIN_COMPONENTS } from '@talend/react-components';
import I18N_DOMAIN_CONTAINERS from '../../src/constant';

init({
	resources: {
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
				DELETE_RESOURCE_REMOVE: 'Êtes vous sûr de vouloir supprimer {{resourceLabel}} ',
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
		zIndex: 100000,
	};

	function renderBtn(locale, isDefault) {
		return (
			<button className="btn" onClick={() => changeLanguage(locale)}>
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
