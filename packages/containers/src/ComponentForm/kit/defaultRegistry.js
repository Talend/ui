/**
 *  Copyright (C) 2006-2018 Talend Inc. - www.talend.com
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import clonedeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import Form from '@talend/react-forms';

const { removeError, addError, getError } = Form.UIForm.utils.errors;
const { mutateValue } = Form.UIForm.utils.properties;
/**
 * Change errors on the target input
 * Add the error if trigger results in an error
 * Remove error if trigger has no error
 * @param errors The form errors map
 * @param schema The input schema
 * @param errorMessage The trigger error message
 * @returns {object} The new errors map
 */
function getNewErrors(errors, schema, errorMessage) {
	if (errorMessage) {
		return addError(errors, schema, errorMessage);
	} else if (getError(errors, schema) !== undefined) {
		return removeError(errors, schema);
	}
	return errors;
}

/**
 * Add or Remove the input error depending on the trigger result
 * @param schema The input schema
 * @param body The trigger response body
 * @param errors The form errors map
 * @returns {{errors: *}} The new errors map
 */
function validation({ schema, body, errors = {} }) {
	const errorMessage = body.status === 'KO' ? body.comment : null;
	return { errors: getNewErrors(errors, schema, errorMessage) };
}

function schemaReducer(acc, entry) {
	// eslint-disable-next-line no-param-reassign
	acc[entry.name] = entry.type;
	return acc;
}

/**
 * Insert new form data
 * @param schema The input schema
 * @param body The trigger response body
 * @param properties The form data
 * @param trigger The trigger configuration
 * @param errors The form errors map
 * @returns {{properties: *, errors: Object}} The properties and errors map
 */
function updateSchema({ schema, body, properties, trigger, errors }) {
	const newErrors = getNewErrors(errors, schema, body.error);
	let newProperties = properties;

	if (body.entries && trigger.options && trigger.options.length !== 0) {
		newProperties = clonedeep(properties);
		trigger.options.forEach(option => {
			const splitted = option.path.split('.');
			const key = splitted[splitted.length - 1];
			const parent = get(newProperties, splitted.slice(0, -1).join('.'));
			if (!parent || typeof parent !== 'object') {
				return;
			}
			if (option.type === 'array') {
				parent[key] = body.entries.map(entry => entry.name);
			} else {
				parent[key] = body.entries.reduce(schemaReducer, {});
			}
		});
	}
	return {
		properties: newProperties,
		errors: newErrors,
	};
}

function suggestions({ body }) {
	// intended to be overriden by apps
	return { titleMap: (body.items || []).map(item => ({ name: item.label, value: item.id })) };
}

/**
 * extract from error object valuable information for the user
 * We have two cases:
 * - js error object: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error
 * - message sent from the backend: http 520 with description and may be code.
 * @param {Object} error the error object
 * @returns {string} the message
 */
function extractErrorMessage(error) {
	if (error.code && error.description) {
		return `${error.code !== 'ACTION_ERROR' ? `[${error.code}]` : ''} ${error.description}`;
	} else if (error.description) {
		return error.description;
	}
	// in case of JS error message (fetch fails and others)
	if (typeof error.message === 'string') {
		return error.message;
	}
	// fallback don't know what happens
	return JSON.stringify(error);
}

/**
 * Update errors status
 * @param {Object} options with { errors, error, schema }
 * @return {Object} { errors } status
 */
function onError({ errors, error, schema }) {
	return { errors: getNewErrors(errors, schema, extractErrorMessage(error)) };
}

/**
 * Update the content of the properties
 * @param body is the new value
 * @param trigger the trigger that call it
 * @example
const trigger = {
	"action":"guessMe",
	"family":"test",
	"options":[
		{
			"path":"root.updatable_config",
			"type":"object" // or "string"
		}
	],
	"parameters":[
		{
			"key":"arg0.name",
			"path":"root.updatable_config.name"
		}
	],
	"type":"update"
};
 */
function updateProperties({ body, trigger, properties }) {
	const targetPath = trigger.options[0].path;
	const schema = { key: targetPath.split('.') };
	const value = trigger.options[0].type === 'object' ? body : body.data;
	return {
		properties: mutateValue(properties, schema, value),
	};
}

export default {
	// dynamic_values, server side
	healthcheck: validation,
	schema: updateSchema,
	update: updateProperties,
	validation,
	suggestions,
	error: onError,
};
