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

function step(anything, key, payload) {
	// on native values, we just add it in the payload
	if (typeof anything !== 'object') {
		payload[key] = anything;
	} else {
		// for objects (including arrays), we flatten it. The we store it in 2 forms.
		// Let's say that we have a key 'my-object'.
		// - Form 1: { 'my-object' : {<flattenedObject>} }
		// - Form 2: { 'my-object.key1': value1, my-object.key2: value2, ... }
		const subPayload = {};
		if (Array.isArray(anything)) {
			anything.forEach((item, index) => {
				const itemKey = `[${index}]`;
				step(item, itemKey, subPayload, false);
			});
		} else {
			Object.keys(anything).forEach(nextKey => {
				const itemKey = key ? `.${nextKey}` : nextKey;
				const item = anything[nextKey];
				step(item, itemKey, subPayload, false);
			});
		}

		// Form 1: { 'my-object' : {<flattenedObject>} }
		payload[key] = subPayload;
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
 * @return {object} flatten object
 * @example
 * flatten({ level1: { level2: 'foo' }})
 * // { 'level1.level2': 'foo' }
 */
export default function flatten(obj) {
	const payload = {};
	step(obj, '', payload);
	return payload;
}
