import React from 'react';
import classNames from 'classnames';

import theme from './RowSelection.scss';

/**
 * Row renderer that wrap the default table row renderer
 * It manages row selection classname
 */
function RowSelectionRenderer(WrappedComponent, { isSelected, getRowData }) {
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

	return RowSelection;
}

export default RowSelectionRenderer;
