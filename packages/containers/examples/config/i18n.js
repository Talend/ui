import i18n from 'i18next';
import I18N_DOMAIN from 'react-talend-components';

i18n
	.init({
		resources: {
			fr: {
				[I18N_DOMAIN]: {
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
				},
			},
			it: {
				[I18N_DOMAIN]: {
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
				},
			},
		},
		debug: false,
		wait: true, // globally set to wait for loaded translations in translate hoc
	});


export default i18n;
