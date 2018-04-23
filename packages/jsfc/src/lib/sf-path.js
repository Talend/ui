export { parse } from 'objectpath';
export { stringify } from 'objectpath';
export { normalize } from 'objectpath';

/**
 * I am a name formatter function for processing keys into names for classes or Id.
 *
 * @param  {Array<string>} key         I am the key array of a processed schema key
 * @param  {string}        separator   I am the separator between the key items and optional form name
 * @param  {string}        formName    I am an optional form name
 * @param  {boolean}       omitNumbers I determine if numeric values should be included in the output or withheld
 *
 * @return {string}                    I am the formatted key
 */
export function name(key: Array<string>, separator?: string, formName = '', omitNumbers = false) {
	if (key) {
		let fieldKey = key.slice();
		let fieldSeparator = separator || '-';

		if (omitNumbers) {
			fieldKey = fieldKey.filter(function(currentKey: any) {
				return typeof currentKey !== 'number';
			});
		}

		return (formName.length !== 0 ? formName + fieldSeparator : '') + fieldKey.join(fieldSeparator);
	}

	return '';
}
