import ResourcePicker from './ResourcePicker.component';
import { SORT_OPTIONS, ORDERS, STATE_FILTERS } from '../ResourceList/Toolbar';

const TOOLBAR_OPTIONS = {
	ORDERS,
	SORT_OPTIONS,
	STATE_FILTERS,
};

export default ResourcePicker;

// TODO 6.0 remove this export, they are now attached to the component
export { TOOLBAR_OPTIONS };
