export default {
	actions: {
		// Generic menus -----------------------------------------------------------
		'menu:first': {
			label: 'First',
			icon: 'talend-streams',
			payload: {
				type: 'MENU_',
			},
		},
		'menu:second': {
			label: 'Second',
			icon: 'talend-dataprep',
			payload: {
				type: 'MENU_',
			},
		},
		'menu:third': {
			label: 'Configuration',
			icon: 'talend-cog',
			payload: {
				type: 'MENU_',
			},
		},
		'menu:fourth': {
			label: 'Upload',
			icon: 'talend-upload',
			displayMode: 'file',
			payload: {
				type: 'UPLOAD',
			},
		},
		'menu:items': {
			id: 'menu:items',
			displayMode: 'dropdown',
			label: 'my items',
			itemsExpression: 'getItems',
			actionCreator: 'object:view',
		},
		'menu:items-id': {
			id: 'menu:items-id',
			displayMode: 'dropdown',
			label: 'my items',
			actionIds: ['menu:first', 'menu:second'],
			actionCreator: 'object:view',
		},
		'menu:href': {
			id: 'menu:href',
			label: 'Talend',
			target: '_blank',
			href: '//www.talend.com',
		},

		// About dialog story -----------------------------------------------------------
		'about-dialog:show': {
			label: 'Show',
			payload: {
				type: 'ABOUT_DIALOG_SHOW',
				url: 'https://tdp.us.cloud.talend.com/api/version',
			},
		},

		// Action story -----------------------------------------------------------
		'action:overlay': {
			id: 'action:overlay',
			label: 'overlay with component',
			overlayComponent: 'ComponentOverlay',
			overlayComponentProps: {
				customProps: 'customProps',
			},
			overlayPlacement: 'bottom',
			payload: { type: 'BUTTON_OVERLAY' },
		},

		// ActionDropdown story -----------------------------------------------------------
		'action-dropdown:href': {
			id: 'action-dropdown:href',
			displayMode: 'dropdown',
			label: 'my items',
			actionIds: ['menu:href'],
			actionCreator: 'object:view',
		},

		// ActionIconToggle story -----------------------------------------------------------
		'action-icon-toggle:toggle': {
			icon: 'talend-panel-opener-right',
			id: 'action:icon:toggle',
			label: 'Click me to toggle',
			tooltipPlacement: 'top',
			activeExpression: { id: 'isFlagExpression', args: ['action:icon:creator:flag'] },
			payload: { type: 'TOGGLE_FLAG_TYPE', flagId: 'action:icon:creator:flag' },
		},
	},
};
