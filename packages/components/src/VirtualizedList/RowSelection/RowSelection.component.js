import React from 'react';
import classNames from 'classnames';

import theme from './RowSelection.scss';

/**
 * Higher order row-renderer that wrap the provided row renderer.
 * It manages row selection classname and inject it to the row renderer props.
 */
function getRowSelectionRenderer(WrappedComponent, { isSelected, getRowData }) {
	function RowSelection(props) {
		const rowData = getRowData(props);

		const enhancedClassNames = classNames(
			props.className,
			theme['row-selection'],
			{ [theme.selected]: isSelected(rowData) },
			{ selected: isSelected(rowData) },
		);
		return (
			<WrappedComponent {...props} className={enhancedClassNames} />
		);
	}
	RowSelection.propTypes = WrappedComponent.propTypes;
	RowSelection.displayName = `RowSelection(${WrappedComponent.displayName})`;

	return RowSelection;
}

export default getRowSelectionRenderer;
