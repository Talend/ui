/* eslint-disable import/prefer-default-export */
export function getError(errors, name, messages) {
	if (!errors[name]) return null;

	return messages[errors[name]].message;
}
