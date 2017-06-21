import React from 'react';
import {
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import RowSelectionRenderer from '../RowSelection';

/**
 * Higher order row-renderer that wrap the provided row renderer.
 * It manages row selection classname and inject it to the row renderer props.
 */
function getRowRenderer({ selectionToggle, isSelected }) {
	const RowTableRender = selectionToggle ?
		RowSelectionRenderer( // eslint-disable-line new-cap
			DefaultTableRowRenderer,
			{
				isSelected,
				getRowData: rowProps => rowProps.rowData,
			}) :
		DefaultTableRowRenderer;

	function Row(props) {
		const { isScrolling } = props;

		if (isScrolling) {
			// create a skeleton to avoid many paint during the scroll
			// improve the performance on the browsers
			// waiting guidelines from UX
			return (
				<div {...props} />);
		}
		return <RowTableRender {...props} />;
	}
	Row.propTypes = DefaultTableRowRenderer.propTypes;
	Row.displayName = 'VirtualizedList(RowRender)';

	return Row;
}

export default getRowRenderer;
