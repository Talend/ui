import React from 'react';
import classNames from 'classnames';

import theme from './RowTableSelection.scss';

/**
 * Row renderer that wrap the default table row renderer
 * It manages row selection classname
 */
function RowTableSelectionRenderer(WrappedComponent, { isSelected }) {
	function RowTableSelection(props) {
		const { className, rowData } = props;
		const enhancedClassNames = classNames(
			className,
			theme['row-table-selection'],
			{ [theme.selected]: isSelected(rowData) },
			{ selected: isSelected(rowData) },
		);
		return (
			<WrappedComponent {...props} className={enhancedClassNames} />
		);
	}
	RowTableSelection.propTypes = WrappedComponent.propTypes;

	return RowTableSelection;
}

export default RowTableSelectionRenderer;
