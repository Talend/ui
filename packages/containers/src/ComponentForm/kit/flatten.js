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
/**
 * flatten an object means each keys are a jsonpath.
 * jsperf: https://jsperf.com/talend-flatten
 * @param {object} obj the source object
 * @param {boolean} includeObjects should include object/array in the payload
 * @return {object} flatten object
 * @example
 * flatten({ level1: { level2: 'foo' }})
 * // { 'level1.level2': 'foo' }
 */
export default function flatten(obj, includeObjects) {
	const payload = {};

	function step(anything, key) {
		if (
			key !== '' &&
			(typeof anything === 'string' ||
				typeof anything === 'number' ||
				typeof anything === 'boolean' ||
				includeObjects)
		) {
			payload[key] = anything;
		}
		if (Array.isArray(anything)) {
			anything.forEach((item, index) => {
				const itemKey = `${key}[${index}]`;
				step(item, itemKey);
			});
		} else if (typeof anything === 'object') {
			Object.keys(anything).forEach(nextKey => {
				const itemKey = key ? `${key}.${nextKey}` : nextKey;
				const item = anything[nextKey];
				step(item, itemKey);
			});
		}
	}
	step(obj, '');
	return payload;
}
