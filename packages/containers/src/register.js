import { api } from '@talend/react-cmf';
import {
	Action,
	ActionBar,
	ActionButton,
	ActionFile,
	ActionDropdown,
	Actions,
	ActionSplitDropdown,
	Breadcrumbs,
	CircularProgress,
	ConfirmDialog,
	Drawer,
	DeleteResource,
	FilterBar,
	Form,
	HeaderBar,
	HomeListView,
	Icon,
	IconsProvider,
	Layout,
	List,
	Notification,
	ObjectViewer,
	Redirect,
	ShortcutManager,
	SelectObject,
	SidePanel,
	SubHeaderBar,
	TooltipTrigger,
	TreeView,
	Typeahead,
} from './index';

export function registerAllContainers() {
	api.component.register('Action', Action);
	api.component.register('ActionBar', ActionBar);
	api.component.register('ActionButton', ActionButton);
	api.component.register('ActionFile', ActionFile);
	api.component.register('ActionDropdown', ActionDropdown);
	api.component.register('Actions', Actions);
	api.component.register('ActionSplitDropdown', ActionSplitDropdown);
	api.component.register('Breadcrumbs', Breadcrumbs);
	api.component.register('CircularProgress', CircularProgress);
	api.component.register('ConfirmDialog', ConfirmDialog);
	api.component.register('Drawer', Drawer);
	api.component.register('DeleteResource', DeleteResource);
	api.component.register('FilterBar', FilterBar);
	api.component.register('Form', Form);
	api.component.register('HeaderBar', HeaderBar);
	api.component.register('HomeListView', HomeListView);
	api.component.register('Icon', Icon);
	api.component.register('IconsProvider', IconsProvider);
	api.component.register('Layout', Layout);
	api.component.register('List', List);
	api.component.register('Notification', Notification);
	api.component.register('ObjectViewer', ObjectViewer);
	api.component.register('Redirect', Redirect);
	api.component.register('ShortcutManager', ShortcutManager);
	api.component.register('SelectObject', SelectObject);
	api.component.register('SidePanel', SidePanel);
	api.component.register('SubHeaderBar', SubHeaderBar);
	api.component.register('TooltipTrigger', TooltipTrigger);
	api.component.register('TreeView', TreeView);
	api.component.register('Typeahead', Typeahead);
}
