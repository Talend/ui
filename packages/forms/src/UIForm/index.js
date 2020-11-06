import * as FormTemplate from './FormTemplate';
import * as FieldTemplate from './fields/FieldTemplate';
import fields from './fields';
import fieldsets from './fieldsets';
import Message from './Message';
import callTrigger from './trigger';
import utils from './utils';
import Widget from './Widget';

import customFormats from './customFormats';
import lang from './lang';
import merge from './merge';
import UIForm from './UIForm.container';

// TODO Remove for 6.0
import * as triggers from './utils/triggers';

export { UIForm, triggers };

UIForm.FormTemplate = FormTemplate;
UIForm.FieldTemplate = FieldTemplate;
UIForm.Message = Message;
UIForm.callTrigger = callTrigger;
UIForm.utils = utils;
UIForm.Widget = Widget;

UIForm.customFormats = customFormats;
UIForm.lang = lang;
UIForm.merge = merge;
UIForm.fields = fields;
UIForm.fieldsets = fieldsets;

export default UIForm;
