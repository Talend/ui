import bootstrap from './bootstrap';
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
import CircularProgress from './CircularProgress';
import CollapsiblePanel from './CollapsiblePanel';
import ConfirmDialog from './ConfirmDialog';
import Datalist from './Datalist';
import { ModelViewer, RecordsViewer } from './DataViewer';
import {
	InputDatePicker,
	InputDateRangePicker,
	InputDateTimePicker,
	InputTimePicker,
} from './DateTimePickers';
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
import HeaderBar from './HeaderBar';
import HttpError from './HttpError';
import i18n from './i18n/index';
import Rich from './RichTooltip';
import Icon from './Icon';
import IconsProvider from './IconsProvider';
import Inject from './Inject';
import { InlineMessage } from './InlineMessage';
import JSONSchemaRenderer from './JSONSchemaRenderer';
import Layout from './Layout';
import List from './List';
import ListView from './ListView';
import Loader from './Loader';
import MultiSelect from './MultiSelect';
import Notification from './Notification';
import ObjectViewer from './ObjectViewer';
import PieChart from './PieChart';
import Progress from './Progress';
import RadarChart from './RadarChart';

import TreeView from './TreeView';
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
import Typeahead from './Typeahead';
import VirtualizedList from './VirtualizedList';
import WithDrawer from './WithDrawer';
import ResourceList from './ResourceList';

// TODO 6.0: remove those imports
import Tile from './GridLayout/Tile';
import HeaderTitle from './HeaderTitle';
import RichLayout from './RichTooltip/RichLayout';
import RichError from './RichTooltip/RichError';
import getTranslated from './TranslateWrapper';
import I18N_DOMAIN_COMPONENTS, { CIRCULAR_PROGRESS_SIZE } from './constants';

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
	CircularProgress,
	CollapsiblePanel,
	ConfirmDialog,
	Datalist,
	ModelViewer,
	RecordsViewer,
	InputDatePicker,
	InputDateRangePicker,
	InputDateTimePicker,
	InputTimePicker,
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
	HttpError,
	Rich,
	i18n,
	Icon,
	IconsProvider,
	Inject,
	InlineMessage,
	JSONSchemaRenderer,
	Layout,
	List,
	ListView,
	Loader,
	MultiSelect,
	Notification,
	ObjectViewer,
	// TODO 6.0: export OverlayTrigger here. For now there is already an OverlayTrigger from react-bootstrap
	PieChart,
	Progress,
	RadarChart,
	// PLOP: PR cursor to go over the components
	Checkbox,
	ResourceList,
	ResourcePicker,
	SidePanel,
	Skeleton,
	Status,
	Stepper,
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
	RichError,
	RichLayout,
	HeaderTitle,
	Tile,
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
