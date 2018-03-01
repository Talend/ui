import { api } from '@talend/react-cmf';
import DefaultCellRenderer from './components/DefaultCellRenderer';
import DefaultHeaderRenderer from './components/DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './components/DefaultPinHeaderRenderer';
import DefaultIntCellRenderer from './components/DefaultIntCellRenderer';

export default function registerAllComponents() {
	api.component.register('DefaultCellRenderer', DefaultCellRenderer);
	api.component.register('DefaultHeaderRenderer', DefaultHeaderRenderer);
	api.component.register('DefaultPinHeaderRenderer', DefaultPinHeaderRenderer);
	api.component.register('DefaultIntCellRenderer', DefaultIntCellRenderer);
}
