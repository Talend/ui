import bootstrap from './bootstrap';
import I18N_DOMAIN_COMPONENTS, { CIRCULAR_PROGRESS_SIZE } from './constants';
import AboutDialog from './AboutDialog';
import {
	Action,
	Actions,
	ActionButton,
	ActionDropdown,
	ActionFile,
	ActionIconToggle,
	ActionSplitDropdown,
} from './Actions';
import ActionBar from './ActionBar';
import ActionList from './ActionList';
import AppGuidedTour from './AppGuidedTour';
import AppLoader from './AppLoader';
import Notification from './Notification';
import HeaderBar from './HeaderBar';
import HttpError from './HttpError';
import Badge from './Badge';
import Breadcrumbs from './Breadcrumbs';
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
import FocusManager from './FocusManager';
import GridLayout from './GridLayout';
import GuidedTour from './GuidedTour';
import HeaderTitle from './HeaderTitle';
import ListView from './ListView';
import TreeView from './TreeView';
import Icon from './Icon';
import IconsProvider from './IconsProvider';
import { InputDatePicker, InputDateTimePicker, InputTimePicker } from './DateTimePickers';
import JSONSchemaRenderer from './JSONSchemaRenderer';
import Layout from './Layout';
import List from './List';
import Loader from './Loader';
import ObjectViewer from './ObjectViewer';
import PieChart from './PieChart';
import Progress from './Progress';
import ResourcePicker from './ResourcePicker';
import Skeleton from './Skeleton';
import SidePanel from './SidePanel';
import { Status } from './Status';
import SubHeaderBar from './SubHeaderBar';
import Stepper from './Stepper';
import TabBar from './TabBar';
import Table from './Table';
import Tile from './GridLayout/Tile';
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

import getTheme from './theme';
import getLocale from './DateFnsLocale/locale';

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
	Action,
	Actions,
	ActionBar,
	ActionList,
	ActionButton,
	ActionDropdown,
	ActionFile,
	ActionIconToggle,
	ActionSplitDropdown,
	AppGuidedTour,
	AppLoader,
	Badge,
	Breadcrumbs,
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
	FocusManager,
	GridLayout,
	GuidedTour,
	HeaderBar,
	HeaderTitle,
	HttpError,
	Icon,
	IconsProvider,
	Inject,
	InlineMessage,
	InputDatePicker,
	InputDateTimePicker,
	InputTimePicker,
	JSONSchemaRenderer,
	Layout,
	List,
	ListView,
	Loader,
	ModelViewer,
	Notification,
	ObjectViewer,
	PieChart,
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
	SubHeaderBar,
	TabBar,
	Table,
	Tile,
	Toggle,
	TooltipTrigger,
	TreeView,
	Typeahead,
	VirtualizedList,
	WithDrawer,
	getTranslated,
	getTheme,
	getLocale,
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
