import DefaultCellRenderer from './components/DefaultCellRenderer';
import DefaultHeaderRenderer from './components/DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './components/DefaultPinHeaderRenderer';
import DefaultIntCellRenderer from './components/DefaultIntCellRenderer';
import DefaultDateCellRenderer from './components/DefaultDateCellRenderer';
import DataGrid from './containers';

const components = {
	DataGrid,
	DefaultCellRenderer,
	DefaultHeaderRenderer,
	DefaultPinHeaderRenderer,
	DefaultIntCellRenderer,
	DefaultDateCellRenderer,
};

export default {
	id: 'datagrid',
	components,
};
