import { api } from '@talend/react-cmf';
import DefaultCellRenderer from './DefaultCellRenderer';
import DefaultHeaderRenderer from './DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './DefaultPinHeaderRenderer';
import DefaultIntCellRenderer from './DefaultIntCellRenderer';

export default function registerAllComponents() {
	api.component.register('DefaultCellRenderer', DefaultCellRenderer);
	api.component.register('DefaultHeaderRenderer', DefaultHeaderRenderer);
	api.component.register('DefaultPinHeaderRenderer', DefaultPinHeaderRenderer);
	api.component.register('DefaultIntCellRenderer', DefaultIntCellRenderer);
}
