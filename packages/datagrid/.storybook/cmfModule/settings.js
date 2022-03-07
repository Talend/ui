export default {
	props: {
		'Container(DataGrid)#default': {
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sample', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
			cellRenderer: 'DefaultCellRenderer',
		},
		'Container(DataGrid)#ProgressDatagrid': {
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sample', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			cellRenderer: 'DefaultCellRenderer',
			loading: true,
		},
		'Container(DataGrid)#CustomizedDatagrid': {
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sample', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
			cellRenderer: 'CustomCellRenderer',
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
		},
		'Container(DataGrid)#CustomizedAvroDatagrid': {
			avroRenderer: {
				intCellRenderer: 'CustomIntCellRenderer',
				dateCellRenderer: 'CustomDateCellRenderer',
				booleanCellRenderer: 'CustomBooleanCellRenderer',
			},
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sample', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			onVerticalScrollActionCreator: 'datagrid:vertical-scroll',
			headerRenderer: 'CustomHeaderRenderer',
			pinHeaderRenderer: 'CustomPinHeaderRenderer',
		},
		'Container(DataGrid)#HightLightRows': {
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sample', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			onScrollActionCreator: 'datagrid:vertical-scroll',
			cellRenderer: 'DefaultCellRenderer',
			rowSelection: 'multiple',
		},
		'Container(DataGrid)#TypeRenderer': {
			dataExpression: {
				id: 'cmf.collections.get',
				args: ['sampleRenderer', []],
			},
			onFocusedCellActionCreator: 'datagrid:focus-cell',
			onFocusedColumnActionCreator: 'datagrid:focus-column',
			onScrollActionCreator: 'datagrid:vertical-scroll',
			cellRenderer: 'DefaultCellRenderer',
		},
	},
};
