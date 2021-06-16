import deprecated from './deprecated';
import rhf from './rhf';
import UIForm from './UIForm';
import widgets from './widgets';

import { I18N_DOMAIN_FORMS } from './constants';
import FormSkeleton from './FormSkeleton';
import FormSwitcher from './FormSwitcher';
import validate from './validate';
import translate from './translate';

const Form = FormSwitcher;
Form.constants = {
	I18N_DOMAIN_FORMS,
};
Form.utils = {
	translate,
	validate,
};
Form.Skeleton = FormSkeleton;
Form.deprecated = deprecated;
Form.rhf = rhf;
Form.UIForm = UIForm;
Form.widgets = widgets;

export default Form;

// FIXME remove for 6.0
export { I18N_DOMAIN_FORMS };
