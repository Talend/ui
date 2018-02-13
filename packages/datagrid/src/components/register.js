import { api } from '@talend/react-cmf';
import DefaultCellRenderer from './default-cell-renderer';
import DefaultHeaderRenderer from './default-header-renderer';
import DefaultPinHeaderRenderer from './default-pin-header-renderer';
import DefaultStringCellRenderer from './string-cell-renderer/';
import DefaultIntCellRenderer from './int-cell-renderer';
import DefaultBooleanCellRenderer from './boolean-cell-renderer';
import DefaultDateCellRenderer from './date-cell-renderer';

export default function registerAllComponents() {
	api.component.register('DefaultCellRenderer', DefaultCellRenderer);
	api.component.register('DefaultHeaderRenderer', DefaultHeaderRenderer);
	api.component.register('DefaultPinHeaderRenderer', DefaultPinHeaderRenderer);
	api.component.register('DefaultStringCellRenderer', DefaultStringCellRenderer);
	api.component.register('DefaultIntCellRenderer', DefaultIntCellRenderer);
	api.component.register('DefaultBooleanCellRenderer', DefaultBooleanCellRenderer);
	api.component.register('DefaultDateCellRenderer', DefaultDateCellRenderer);
}
