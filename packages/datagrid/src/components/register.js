import { api } from '@talend/react-cmf';
import DefaultCellRenderer from './DefaultCellRenderer';
import DefaultHeaderRenderer from './DefaultHeaderRenderer';
import DefaultPinHeaderRenderer from './DefaultPinHeaderRenderer';
import DefaultStringCellRenderer from './DefaultStringCellRenderer/';
import DefaultIntCellRenderer from './DefaultIntCellRenderer';
import DefaultBooleanCellRenderer from './DefaultBooleanCellRenderer';
import DefaultDateCellRenderer from './DefaultDateCellRenderer';

export default function registerAllComponents() {
	api.component.register('DefaultCellRenderer', DefaultCellRenderer);
	api.component.register('DefaultHeaderRenderer', DefaultHeaderRenderer);
	api.component.register('DefaultPinHeaderRenderer', DefaultPinHeaderRenderer);
	api.component.register('DefaultStringCellRenderer', DefaultStringCellRenderer);
	api.component.register('DefaultIntCellRenderer', DefaultIntCellRenderer);
	api.component.register('DefaultBooleanCellRenderer', DefaultBooleanCellRenderer);
	api.component.register('DefaultDateCellRenderer', DefaultDateCellRenderer);
}
