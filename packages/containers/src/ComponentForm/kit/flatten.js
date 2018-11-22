/* eslint-disable no-param-reassign */
/**
 *  Copyright (C) 2006-2018 Talend Inc. - www.talend.com
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

function step(anything, key, payload, options = {}) {
	// on native values, we just add it in the payload
	if (typeof anything !== 'object') {
		payload[key] = anything;
	} else {
		// For objects (including arrays), we flatten it.
		// We store it in 2 forms depending on options.
		//
		// Let's say that we have an array { 'my-array': ['tata', 'toto'] }.
		// - Form 1: { 'my-array' : { '[0]': 'tata', '[1]': 'toto' } }
		// - Form 2: { 'my-array[0]': 'tata', 'my-array[1]': 'toto' }
		//
		// And for objects { 'my-object': { first: 'tata', second: 'toto' } }.
		// - Form 1: { 'my-object' : { '.first': 'tata', '.second': 'toto' } }
		// - Form 2: { 'my-object.first': 'tata', 'my-object.second': 'toto' }
		const subPayload = {};
		if (Array.isArray(anything)) {
			anything.forEach((item, index) => {
				const itemKey = `[${index}]`;
				step(item, itemKey, subPayload, options);
			});
		} else {
			Object.keys(anything).forEach(nextKey => {
				const itemKey = `.${nextKey}`;
				const item = anything[nextKey];
				step(item, itemKey, subPayload, options);
			});
		}

		// Form 1: { 'my-object' : {<flattenedObject>} }
		if (options.includeObjects) {
			payload[key] = subPayload;
		}
		// Form 2: { 'my-object.key1': value1, my-object.key2: value2, ... }
		Object.keys(subPayload).forEach(subKey => {
			payload[`${key}${subKey}`] = subPayload[subKey];
		});
	}
}

/**
 * flatten an object means each keys are a jsonpath.
 * jsperf: https://jsperf.com/talend-flatten
 * @param {object} obj the source object
 * @param {object} options
 * @return {object} flatten object
 * @example
 * flatten({ level1: { level2: 'foo' }})
 * // { 'level1.level2': 'foo' }
 */
export default function flatten(obj, options) {
	return Object.keys(obj).reduce((accu, key) => {
		step(obj[key], key, accu, options);
		return accu;
	}, {});
}
