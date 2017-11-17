import {
	Alert,
	Badge,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Carousel,
	CarouselItem,
	Checkbox as BootstrapCheckbox,
	Clearfix,
	ControlLabel,
	Col,
	Collapse,
	Dropdown,
	DropdownButton,
	Fade,
	Form,
	FormControl,
	FormGroup,
	Glyphicon,
	Grid,
	HelpBlock,
	Image,
	InputGroup,
	Jumbotron,
	Label,
	ListGroup,
	ListGroupItem,
	Media,
	MenuItem,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Nav,
	Navbar,
	NavbarBrand,
	NavDropdown,
	NavItem,
	Overlay,
	OverlayTrigger,
	PageHeader,
	PageItem,
	Pager,
	Pagination,
	Panel,
	PanelGroup,
	Popover,
	ProgressBar,
	Radio,
	ResponsiveEmbed,
	Row,
	SafeAnchor,
	SplitButton,
	Tab,
	TabContainer,
	TabContent,
	Table,
	TabPane,
	Tabs,
	Thumbnail,
	Tooltip,
	Well,
} from 'react-bootstrap';

import I18N_DOMAIN_COMPONENTS from './constants';

import { Action, ActionFile, ActionDropdown, ActionButton, ActionSplitDropdown, Actions } from './Actions';
import ActionBar from './ActionBar';
import AppHeaderBar from './AppHeaderBar';
import Branding from './Branding';
import Breadcrumbs from './Breadcrumbs';
import CircularProgress from './CircularProgress';
import CollapsiblePanel from './CollapsiblePanel';
import ConfirmDialog from './ConfirmDialog';
import Dialog from './Dialog';
import Drawer from './Drawer';
import Emphasis from './Emphasis';
import Enumeration from './Enumeration';
import HeaderBar from './HeaderBar';
import HttpError from './HttpError';
import Icon from './Icon';
import IconsProvider from './IconsProvider';
import JSONSchemaRenderer from './JSONSchemaRenderer';
import Layout from './Layout';
import List from './List';
import ListView from './ListView';
import Notification from './Notification';
import ObjectViewer from './ObjectViewer';
import Progress from './Progress';
import SidePanel from './SidePanel';
import Status from './Status';
import TalendBadge from './Badge';
import TabBar from './TabBar';
import Toggle, { Checkbox } from './Toggle';
import TooltipTrigger from './TooltipTrigger';
import TreeView from './TreeView';
import Typeahead from './Typeahead';
import VirtualizedList from './VirtualizedList';
import WithDrawer from './WithDrawer';

import getTranslated from './TranslateWrapper';

export {
	Action,
	ActionBar,
	ActionButton,
	ActionFile,
	ActionDropdown,
	ActionSplitDropdown,
	Actions,
	AppHeaderBar,
	Branding,
	HeaderBar,
	HttpError,
	Breadcrumbs,
	CircularProgress,
	Checkbox,
	CollapsiblePanel,
	Dialog,
	Enumeration,
	ListView,
	ConfirmDialog,
	Drawer,
	Emphasis,
	TreeView,
	TalendBadge as Badge,
	Icon,
	IconsProvider,
	Layout,
	List,
	Notification,
	ObjectViewer,
	Progress,
	SidePanel,
	Status,
	TabBar,
	Toggle,
	TooltipTrigger,
	getTranslated,
	Typeahead,
	VirtualizedList,
	WithDrawer,
	Alert,
	Badge as BootstrapBadge,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Carousel,
	CarouselItem,
	BootstrapCheckbox,
	Clearfix,
	ControlLabel,
	Col,
	Collapse,
	Dropdown,
	DropdownButton,
	Fade,
	Form,
	FormControl,
	FormGroup,
	Glyphicon,
	Grid,
	HelpBlock,
	Image,
	InputGroup,
	JSONSchemaRenderer,
	Jumbotron,
	Label,
	ListGroup,
	ListGroupItem,
	Media,
	MenuItem,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Nav,
	Navbar,
	NavbarBrand,
	NavDropdown,
	NavItem,
	Overlay,
	OverlayTrigger,
	PageHeader,
	PageItem,
	Pager,
	Pagination,
	Panel,
	PanelGroup,
	Popover,
	ProgressBar,
	Radio,
	ResponsiveEmbed,
	Row,
	SafeAnchor,
	SplitButton,
	Tab,
	TabContainer,
	TabContent,
	Table,
	TabPane,
	Tabs,
	Thumbnail,
	Tooltip,
	Well,
	I18N_DOMAIN_COMPONENTS,
};
