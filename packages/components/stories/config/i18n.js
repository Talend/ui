import React from 'react';
import i18n from 'i18next';
import I18N_DOMAIN_COMPONENTS from '../../src/constants';

i18n
	.init({
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
					LIST_SELECT_DISPLAY_MODE_TILE: 'Tuile',
					LIST_FILTER_TOGGLE: 'Afficher le filtre',
					LIST_FILTER_REMOVE: 'Supprimer le filtre',
					ENUMERATION_EMPTY_LIST: 'La liste est vide',
					ENUMERATION_HEADER_LABEL: 'Valeurs',
					SIDEPANEL_EXPAND: 'Développer',
					SIDEPANEL_COLLAPSE: 'Réduire',
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
					LIST_SELECT_DISPLAY_MODE_TILE: 'Piastrella',
					LIST_FILTER_TOGGLE: 'Ginocchiera filtro',
					LIST_FILTER_REMOVE: 'Rimuova il filtro',
					ENUMERATION_EMPTY_LIST: 'L\'elenco è vuoto',
					ENUMERATION_HEADER_LABEL: 'Valori',
					SIDEPANEL_EXPAND: 'Espandere',
					SIDEPANEL_COLLAPSE: 'Collassare',
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
	};
	return (
		<nav style={style}>
			<div className="btn-group">
				<button className="btn" onClick={() => i18n.changeLanguage('fr')}>fr</button>
				<button className="btn" onClick={() => i18n.changeLanguage('it')}>it</button>
			</div>
		</nav>
	);
};

export default i18n;
