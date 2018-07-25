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

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';

import flatten from './flatten';
import defaultRegistry from './defaultRegistry';

const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

function noOpTrigger({ error, trigger }) {
	console.error(`${JSON.stringify(trigger)} failed with error ${error || '-'}`);
}

export function normalizePath(specPath, schema) {
	if (!schema) {
		return specPath;
	}
	const contextualPathItems = schema.key;
	if (!specPath || !contextualPathItems) {
		return specPath;
	}
	const segments = specPath.split('.');
	let keyIndex = 0;
	for (let i = 0; i < segments.length; i++) {
		if (
			keyIndex < contextualPathItems.length &&
			segments[i].indexOf('[]') === segments[i].length - '[]'.length
		) {
			keyIndex++; // browse the index and then we are back aligned on the object browsing
			segments[i] = `${segments[i].substring(0, segments[i].length - '[]'.length)}[${
				contextualPathItems[keyIndex]
			}]`;
		}
		keyIndex++;
	}
	return segments.join('.');
	// specPath.split('.').reduce((acc, current, i) => {
	// 	if (acc) {
	// 		acc += '.';
	// 	}
	// 	if (
	// 		keyIndex < contextualPathItems.length &&
	// 		current.indexOf('[]') === current.length - 2 //'[]'.length
	// 	) {

	// 	}
	// }, '')
}

export function extractParameters(parameters, properties, schema) {
	// parameters is an Array
	return parameters.reduce((acc, param) => {
		const value = get(properties, normalizePath(param.path, schema));
		return Object.assign(acc, flatten(value, param.key));
	}, {});
}

export function createCacheKey(trigger) {
	if (trigger.type === 'suggestions') {
		return undefined;
	}
	const cacheKeyParams = (trigger.parameters || []).map(it => it.path).join('#');
	return `trigger.type#trigger.family#trigger.action##${cacheKeyParams}`;
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

export function toURL(obj) {
	return Object.keys(obj)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join('&');
}

// customRegistry can be used to add extensions or custom trigger
// (not portable accross integrations)
export default function createTriggers({ url, customRegistry, lang = 'en', headers, fetchConfig }) {
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
			const result = (services[trigger.type] || noOpTrigger)({
				body,
				errors,
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
			services.error({
				error,
				errors,
				properties,
				schema,
				trigger,
			});
		}
		const fetchUrl = `${url}?${toURL({
			lang,
			action: trigger.action,
			family: trigger.family,
			type: trigger.type,
		})}`;
		return fetch(fetchUrl, {
			method: 'POST',
			headers: actualHeaders,
			body: JSON.stringify(parameters),
			credentials: 'include',
			...fetchConfig,
		})
			.then(toJSON)
			.then(onSuccess)
			.catch(onError);
	};
}
