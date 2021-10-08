import PropTypes from 'prop-types';
import React from 'react';
import Badge from '../../Badge';

/**
 * Cell renderer that displays a badge
 */
class CellBadge extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.cellData !== nextProps.cellData ||
			this.props.columnData !== nextProps.columnData ||
			this.props.rowIndex !== nextProps.rowIndex
		);
	}

	render() {
		const { columnData, cellData, rowIndex } = this.props;
		return <Badge id={`${rowIndex}`} label={cellData} selected={columnData.selected} />;
	}
}

CellBadge.displayName = 'VirtualizedList(CellBadge)';
CellBadge.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	// The collection item index.
	rowIndex: PropTypes.number,
	// Column data
	columnData: PropTypes.shape({
		selected: PropTypes.bool,
	}).isRequired,
};

export default CellBadge;
