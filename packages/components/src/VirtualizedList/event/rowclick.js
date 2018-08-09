const actionsTagNames = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'];

/**
 * Decorate onRowDoubleClick callback to not trigger it if target is an action
 * @param onRowDoubleClick The double click calback
 */
export function decorateRowDoubleClick(onRowDoubleClick) {
	if (!onRowDoubleClick) {
		return undefined;
	}

	return function onRowDoubleClickCallback({ event, rowData }) {
		if (
			event.target.className === 'tc-cell-checkbox' ||
			actionsTagNames.includes(event.target.tagName) ||
			actionsTagNames.includes(event.target.parentElement.tagName)
		) {
			return;
		}
		onRowDoubleClick(event, rowData);
	};
}

/**
 * Adapt onRowClick arguments to the wanted api
 */
export function decorateRowClick(onRowClick) {
	if (!onRowClick) {
		return undefined;
	}
	return function onRowClickCallback({ event, rowData }) {
		return onRowClick(event, rowData);
	};
}
