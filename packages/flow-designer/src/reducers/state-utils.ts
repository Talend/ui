import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Immutable setIn helper for plain Redux state objects.
 * Deep-clones obj then sets the value at path.
 */
export function setIn<T extends object>(obj: T, path: (string | number)[], value: any): T {
	if (path.length === 0) {
		return value as T;
	}
	const clone = cloneDeep(obj);
	set(clone, path, value);
	return clone;
}

/**
 * Immutable deleteIn helper for plain Redux state objects.
 * Deep-clones obj then deletes the key at path.
 */
export function deleteIn<T extends object>(obj: T, path: (string | number)[]): T {
	const clone = cloneDeep(obj);
	if (path.length === 0) return clone;
	const parent = path.length === 1 ? clone : get(clone, path.slice(0, -1));
	if (parent != null) {
		delete (parent as any)[path[path.length - 1]];
	}
	return clone;
}
