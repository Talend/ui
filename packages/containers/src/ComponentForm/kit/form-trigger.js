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
import defaultRegistry from './service';

function noOpTrigger({ error, trigger }) {
	console.error(`${JSON.stringify(trigger)} failed with error ${error || '-'}`);
}

function normalizePath(specPath, contextualPathItems) {
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
}

function extractRequestPayload(parameters, properties, schema) {
	const payload = {};
	for (const param of parameters) {
		const value = get(
			properties,
			schema && schema.key ? normalizePath(param.path, schema.key) : param.path,
		);
		Object.assign(payload, flatten(value, param.key));
	}

	return payload;
}

function getLang(lang) {
	if (!lang) {
		if (navigator) {
			if (navigator.language) {
				return navigator.language;
			} else if (navigator.languages && navigator.languages.length > 0) {
				return navigator.languages[0];
			}
		}
	}
	return lang || 'en';
}

function isCacheable(triggerType) {
	return triggerType === 'suggestions';
}

function createCacheKey(trigger) {
	const cacheKeyParams = (trigger.parameters || []).map(it => it.path).join('#');
	return `trigger.type#trigger.family#trigger.action##${cacheKeyParams}`;
}

// customRegistry can be used to add extensions or custom trigger
// (not portable accross integrations)
export default function getDefaultTrigger({ url, customRegistry, lang, headers }) {
	const encodedLang = encodeURIComponent(getLang(lang));
	const cache = {};
	const actualHeaders = merge(
		{
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		headers,
	);
	return function onDefaultTrigger(event, { trigger, schema, properties, errors }) {
		const services = {
			...defaultRegistry,
			...customRegistry,
		};
		const payload = extractRequestPayload(trigger.parameters, properties, schema);
		const cacheKey = isCacheable(trigger.type) ? createCacheKey(trigger) : undefined;
		if (cacheKey) {
			if (
				cache[cacheKey] &&
				cache[cacheKey].result &&
				isEqual(cache[cacheKey].parameters, payload)
			) {
				return Promise.resolve(cache[cacheKey].result);
			} else if (cache[cacheKey]) {
				delete cache[cacheKey];
			}
		}
		return fetch(
			`${url}?lang=${encodedLang}&action=${encodeURIComponent(
				trigger.action,
			)}&family=${encodeURIComponent(trigger.family)}&type=${encodeURIComponent(trigger.type)}`,
			{
				method: 'POST',
				headers: actualHeaders,
				body: JSON.stringify(payload),
				credentials: 'include',
			},
		)
			.then(resp => {
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
			})
			.then(body => {
				const result = (services[trigger.type] || noOpTrigger)({
					body,
					errors,
					properties,
					schema,
					trigger,
				});
				if (body.cacheable) {
					cache[cacheKey] = {
						parameters: payload,
						result,
					};
				}
				return result;
			})
			.catch(error =>
				services.error({
					error,
					errors,
					properties,
					schema,
					trigger,
				}),
			);
	};
}
