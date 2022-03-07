export default {
	'datagrid:focus-cell': (event, data) => ({
		...event,
		...data,
		type: 'DATAGRID_FOCUS_CELL',
	}),
	'datagrid:focus-column': (event, data) => ({
		...event,
		...data,
		type: 'DATAGRID_FOCUS_COLUMN',
	}),
	'datagrid:vertical-scroll': (event, data) => ({
		...event,
		...data,
		type: 'DATAGRID_SCROLL',
	}),
};
