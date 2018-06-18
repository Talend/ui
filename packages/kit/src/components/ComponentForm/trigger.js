/**
 *  COPY PASTE has to be re written
 */

import get from 'lodash/get';
import flatten from 'component-kit.js/lib/flatten';
import defaultServices from 'component-kit.js/lib/service';

function extractRequestPayload({ parameters = [] } = {}, properties) {
	const payload = {};
	for (const param of parameters) {
		const value = get(properties, param.path);
		Object.assign(payload, flatten(value, param.key));
	}
	return payload;
}

function getURL(base, trigger) {
	return `${base}?action=${encodeURIComponent(trigger.action)}&family=${encodeURIComponent(trigger.family)}&type=${encodeURIComponent(trigger.type)}`;
}

// customRegistry can be used to add extensions or custom trigger (not portable accross integrations)
export default function getDefaultTrigger({ url, services }) {
	return function onDefaultTrigger(event, { trigger, schema, properties, errors }) {
		const allServices = {
			...defaultServices,
			...services,
		};
		const payload = extractRequestPayload(trigger, properties);
		return fetch(
			getURL(url, trigger),
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify(payload),
				credentials: 'include',
			}
		)
		.then(resp => resp.json())
		.then(body => {
			return allServices[trigger.type]({
				body,
				errors,
				properties,
				schema,
				trigger,
			});
		});
	};
}
