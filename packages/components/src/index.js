import bootstrap from './bootstrap';
import I18N_DOMAIN_COMPONENTS, { CIRCULAR_PROGRESS_SIZE } from './constants';
import AboutDialog from './AboutDialog';
import ActionBar from './ActionBar';
import ActionIntercom from './ActionIntercom';
import ActionList from './ActionList';
import {
	Action,
	Actions,
	ActionButton,
	ActionDropdown,
	ActionFile,
	ActionIconToggle,
	ActionSplitDropdown,
} from './Actions';
import AppGuidedTour from './AppGuidedTour';
import AppLoader from './AppLoader';
import AppSwitcher from './AppSwitcher';
import Badge from './Badge';
import Breadcrumbs from './Breadcrumbs';

import Notification from './Notification';
import HeaderBar from './HeaderBar';
import HttpError from './HttpError';
import i18n from './i18n';
import CircularProgress from './CircularProgress';
import CollapsiblePanel from './CollapsiblePanel';
import ConfirmDialog from './ConfirmDialog';
import Datalist from './Datalist';
import Dialog from './Dialog';
import DraggableComponent from './Draggable';
import Drawer from './Drawer';
import EditableText from './EditableText';
import Emphasis from './Emphasis';
import Enumeration from './Enumeration';
import FilterBar from './FilterBar';
import GridLayout from './GridLayout';
import Tile from './GridLayout/Tile';
import GuidedTour from './GuidedTour';
import HeaderTitle from './HeaderTitle';
import ListView from './ListView';
import TreeView from './TreeView';
import Icon from './Icon';
import IconsProvider from './IconsProvider';
import JSONSchemaRenderer from './JSONSchemaRenderer';
import Layout from './Layout';
import List from './List';
import Loader from './Loader';
import ObjectViewer from './ObjectViewer';
import Progress from './Progress';
import ResourcePicker from './ResourcePicker';
import Skeleton from './Skeleton';
import SidePanel from './SidePanel';
import Table from './Table';
import { Status } from './Status';
import SubHeaderBar from './SubHeaderBar';
import Stepper from './Stepper';
import TabBar from './TabBar';
import Toggle, { Checkbox } from './Toggle';
import TooltipTrigger from './TooltipTrigger';
import getTranslated from './TranslateWrapper';
import Typeahead from './Typeahead';
import VirtualizedList from './VirtualizedList';
import WithDrawer from './WithDrawer';
import Inject from './Inject';
import ResourceList from './ResourceList';
import RichLayout from './RichTooltip/RichLayout';
import RichError from './RichTooltip/RichError';
import { ModelViewer, RecordsViewer } from './DataViewer';
import { InlineMessage } from './InlineMessage';

const {
	Alert,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Carousel,
	CarouselItem,
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
	TabPane,
	Tabs,
	Thumbnail,
	Tooltip,
	Well,
} = bootstrap;

const BootstrapBadge = bootstrap.Badge;
const BootstrapCheckbox = bootstrap.Checkbox;
const BootstrapTable = bootstrap.Table;

export {
	AboutDialog,
	ActionBar,
	ActionIntercom,
	ActionList,
	Action,
	Actions,
	ActionButton,
	ActionDropdown,
	ActionFile,
	ActionIconToggle,
	ActionSplitDropdown,
	AppGuidedTour,
	AppLoader,
	AppSwitcher,
	Badge,
	Breadcrumbs,
	// PLOP: PR cursor to go over the components
	Checkbox,
	CircularProgress,
	CollapsiblePanel,
	ConfirmDialog,
	Datalist,
	Dialog,
	DraggableComponent,
	Drawer,
	EditableText,
	Emphasis,
	Enumeration,
	FilterBar,
	GridLayout,
	Tile,
	GuidedTour,
	HeaderBar,
	HeaderTitle,
	HttpError,
	i18n,
	Icon,
	IconsProvider,
	Inject,
	JSONSchemaRenderer,
	Layout,
	List,
	ListView,
	Loader,
	ModelViewer,
	Notification,
	ObjectViewer,
	Progress,
	RecordsViewer,
	ResourceList,
	ResourcePicker,
	RichError,
	RichLayout,
	SidePanel,
	Skeleton,
	Status,
	Stepper,
	InlineMessage,
	SubHeaderBar,
	TabBar,
	Table,
	Toggle,
	TooltipTrigger,
	TreeView,
	Typeahead,
	VirtualizedList,
	WithDrawer,
	// TODO 6.0: remove from here
	getTranslated, // TODO 6.0: remove the TranslateWrapper folder
	I18N_DOMAIN_COMPONENTS,
	CIRCULAR_PROGRESS_SIZE,
	// bootstrap
	Alert,
	BootstrapBadge,
	BootstrapCheckbox,
	BootstrapTable,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Carousel,
	CarouselItem,
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
	TabPane,
	Tabs,
	Thumbnail,
	Tooltip,
	Well,
};
