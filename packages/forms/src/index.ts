import { I18N_DOMAIN_FORMS } from './constants';
import FormSkeleton from './FormSkeleton';
import FormSwitcher from './FormSwitcher';
import rhf from './rhf';
import UIForm, { Code } from './UIForm';
import validate from './validate';

const constants = {
	I18N_DOMAIN_FORMS,
};

const utils = {
	validate,
};

export { FormSwitcher, constants, utils, FormSkeleton, rhf, UIForm };

export type { DisplayMode, UiSchema, FormDefinition } from './types/index';

export default Object.assign(FormSwitcher, {
	constants,
	utils,
	Skeleton: FormSkeleton,
	rhf,
	UIForm,
	Code,
});
