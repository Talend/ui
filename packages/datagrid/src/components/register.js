import { api } from '@talend/react-cmf';
import DefaultCellRenderer from './default-cell-renderer';
import DefaultHeaderRenderer from './default-header-renderer';
import DefaultPinHeaderRenderer from './default-pin-header-renderer';

export default function registerAllComponents() {
	api.component.register('DefaultCellRenderer', DefaultCellRenderer);
	api.component.register('DefaultHeaderRenderer', DefaultHeaderRenderer);
	api.component.register('DefaultPinHeaderRenderer', DefaultPinHeaderRenderer);
}
