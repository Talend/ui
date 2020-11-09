import * as array from './array';
import * as errors from './errors';
import * as properties from './properties';
import * as propTypes from './propTypes';
import * as triggers from './triggers';
import * as validation from './validation';
import condition from './condition';
import templates from './templates';
import widgets from './widgets';
import createCollapsibleFieldset, { defaultTitle } from '../fieldsets/CollapsibleFieldset';

export default {
	array,
	collapsible: {
		createCollapsibleFieldset,
		defaultTitle,
	},
	errors,
	properties,
	propTypes,
	triggers,
	validation,
	condition,
	templates,
	widgets,
};
