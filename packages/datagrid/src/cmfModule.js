import DefaultCellRenderer from './components/DefaultCellRenderer';
import DefaultHeaderRenderer from './components/DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './components/DefaultPinHeaderRenderer';
import DefaultIntCellRenderer from './components/DefaultIntCellRenderer';
import DataGrid from './containers';

const components = {
	DataGrid,
	DefaultCellRenderer,
	DefaultHeaderRenderer,
	DefaultPinHeaderRenderer,
	DefaultIntCellRenderer,
};

export default {
	id: 'datagrid',
	components,
};
