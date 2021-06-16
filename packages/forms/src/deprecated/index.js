import fields from './fields';
import templates from './templates';
import widgets from './widgets';
import Form, {
	customWidgets,
	renderActionIcon,
	renderActions,
	DataPropTypes,
	ActionsPropTypes,
} from './Form';

export { customWidgets, renderActionIcon, renderActions, DataPropTypes, ActionsPropTypes };

Form.fields = fields;
Form.templates = templates;
Form.widgets = widgets;

export default Form;
