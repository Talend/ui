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
/* eslint-disable no-param-reassign */

import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import cmf from '@talend/react-cmf';

import flatten from './flatten';
import defaultRegistry from './defaultRegistry';
console.log(Object.keys(cmf));
const mergeCSRFToken = cmf.middlewares.http.csrf.mergeCSRFToken;

const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

function passthroughTrigger({ error, trigger, body }) {
	// eslint-disable-next-line no-console
	console.error(`${JSON.stringify(trigger)} doesnt exists or fails with error ${error || '-'}`);
	return body;
}

/**
 * array are describe without their index
 * use the schema to guess the path to use
 * to get the value in the properties
 * @param {string} specPath the path provided by the trigger
 * @param {Object} schema the schema of the current field
 * @return {string} path to get the value in properties
 */
export function getPathWithArrayIndex(specPath, schema) {
	if (!schema) {
		return specPath;
	}
	const contextualPathItems = schema.key;
	if (!specPath || !contextualPathItems) {
		return specPath;
	}
	let keyIndex = 0;
	const schemaKey = schema.key;
	return specPath.split('.').reduce((acc, current) => {
		if (acc) {
			acc += '.';
		}
		if (current.endsWith('[]')) {
			acc += `${current.substring(0, current.length - 1)}${schemaKey[keyIndex + 1]}]`;
			keyIndex += 2;
		} else {
			acc += current;
			keyIndex += 1;
		}
		return acc;
	}, '');
}

/**
 * extract parameters from properties
 * @param {Array} parameters required
 * @param {Object} properties source of the data
 * @param {Object} schema of the current field the trigger is executed
 * @return {Object} payload of the trigger
 */
export function extractParameters(parameters, properties, schema) {
	if (!parameters || !Array.isArray(parameters)) {
		return {};
	}
	const flattenProps = flatten(properties, { includeObjects: true });
	return parameters.reduce((acc, param) => {
		const path = getPathWithArrayIndex(param.path, schema);
		const value = flattenProps[path];
		if (typeof value === 'object') {
			Object.keys(value)
				.filter(key => typeof value[key] !== 'object')
				.forEach(key => {
					acc[`${param.key}${key}`] = value[key];
				});
		} else {
			acc[param.key] = value;
		}
		return acc;
	}, {});
}

export function createCacheKey(trigger) {
	if (trigger.type !== 'suggestions' || (trigger.parameters || []).length === 0) {
		return undefined;
	}
	return `${trigger.type}:${trigger.family}:${trigger.action}:${(trigger.parameters || [])
		.map(it => it.path)
		.join(':')}`;
}

export function toJSON(resp) {
	if (!resp.ok || resp.status >= 300) {
		return resp.text().then(error => {
			let json;
			try {
				json = JSON.parse(error);
			} catch (e) {
				json = { error };
			}
			throw json;
		});
	}
	return resp.json();
}

export function toQueryParam(obj) {
	return Object.keys(obj)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join('&');
}

// customRegistry can be used to add extensions or custom trigger
// (not portable accross integrations)
export default function createTriggers({
	url,
	customRegistry,
	lang = 'en',
	headers,
	fetchConfig,
	security = {},
}) {
	if (!url) {
		throw new Error('url params is required to createTriggers');
	}
	const cache = {};
	const actualHeaders = merge({}, DEFAULT_HEADERS, headers);
	return function onDefaultTrigger(event, { trigger, schema, properties, errors }) {
		const services = {
			...defaultRegistry,
			...customRegistry,
		};
		const parameters = extractParameters(trigger.parameters, properties, schema);
		const cacheKey = createCacheKey(trigger);
		if (cacheKey) {
			if (
				cache[cacheKey] &&
				cache[cacheKey].result &&
				isEqual(cache[cacheKey].parameters, parameters)
			) {
				return Promise.resolve(cache[cacheKey].result);
			} else if (cache[cacheKey]) {
				delete cache[cacheKey];
			}
		}
		function onSuccess(body) {
			const result = (services[trigger.type] || passthroughTrigger)({
				body,
				errors,
				event,
				properties,
				schema,
				trigger,
			});
			if (body.cacheable) {
				cache[cacheKey] = {
					parameters,
					result,
				};
			}
			return result;
		}
		function onError(error) {
			return services.error({
				error,
				errors,
				properties,
				schema,
				trigger,
			});
		}
		if (trigger.remote === false) {
			const result = onSuccess({});
			if (result && result.then) {
				return result.catch(onError);
			}
			return new Promise(resolve => resolve(result));
		}
		const config = cmf.sagas.http.getDefaultConfig() || {};
		let httpSecurity = config.security || {};
		if (security.CSRFTokenCookieKey || security.CSRFTokenHeaderKey) {
			httpSecurity = security;
		}
		const fetchUrl = `${url}?${toQueryParam({
			lang,
			action: trigger.action,
			family: trigger.family,
			type: trigger.type,
		})}`;
		return fetch(
			fetchUrl,
			mergeCSRFToken({ security: httpSecurity })({
				method: 'POST',
				headers: actualHeaders,
				body: JSON.stringify(parameters),
				credentials: 'include',
				...fetchConfig,
			}),
		)
			.then(toJSON)
			.then(onSuccess)
			.catch(onError);
	};
}
