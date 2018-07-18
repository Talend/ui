import {
	Breadcrumbs,
	CircularProgress,
	Drawer,
	Icon,
	IconsProvider,
	Layout as PureLayout,
	TooltipTrigger,
} from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';

import actionAPI from './actionAPI';
import Action from './Action';
import ActionBar from './ActionBar';
import ActionButton from './ActionButton';
import ActionDropdown from './ActionDropdown';
import ActionFile from './ActionFile';
import ActionIconToggle from './ActionIconToggle';
import Actions from './Actions';
import ActionSplitDropdown from './ActionSplitDropdown';
import AppLoader from './AppLoader';
import Badge from './Badge';
import ConfirmDialog from './ConfirmDialog';
import FilterBar from './FilterBar';
import HeaderBar from './HeaderBar';
import HomeListView from './HomeListView';
import List from './List';
import Notification from './Notification';
import ObjectViewer from './ObjectViewer';
import Redirect from './Redirect';
import ShortcutManager from './ShortcutManager';
import SelectObject from './SelectObject';
import SidePanel from './SidePanel';
import TreeView from './TreeView';
import DeleteResource from './DeleteResource';
import SubHeaderBar from './SubHeaderBar';
import Typeahead from './Typeahead';
import TabBar from './TabBar';

// keep backward compat
const Layout = cmfConnect({})(PureLayout);

export {
	actionAPI,
	Action,
	ActionBar,
	ActionButton,
	ActionDropdown,
	ActionFile,
	ActionIconToggle,
	Actions,
	ActionSplitDropdown,
	AppLoader,
	Badge,
	Breadcrumbs,
	CircularProgress,
	ConfirmDialog,
	Drawer,
	DeleteResource,
	FilterBar,
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
	TabBar,
	TooltipTrigger,
	TreeView,
	Typeahead,
};
