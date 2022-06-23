import FormSkeleton from './FormSkeleton';
import FormSwitcher from './FormSwitcher';
import UIForm from './UIForm';
import { I18N_DOMAIN_FORMS } from './constants';
import rhf from './rhf';
import validate from './validate';
import widgets from './widgets';

const constants = {
	I18N_DOMAIN_FORMS,
};

const utils = {
	validate,
};

export { FormSwitcher, constants, utils, FormSkeleton, rhf, UIForm, widgets };

export type { DisplayMode, UiSchema, FormDefinition } from './types/index';

export default Object.assign(FormSwitcher, {
	constants,
	utils,
	Skeleton: FormSkeleton,
	rhf,
	UIForm,
	widgets,
});
