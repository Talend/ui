import { Tag } from '@talend/design-system';
import PropTypes from 'prop-types';

/**
 * Cell renderer that displays a label
 */
function CellLabel({ cellData, rowIndex }) {
	const label = typeof cellData === 'string' ? cellData : cellData?.label;
	const variant = cellData?.style || 'information';
	return (
		<Tag id={`${rowIndex}`} variant={variant} title={label}>
			{label}
		</Tag>
	);
}

CellLabel.displayName = 'VirtualizedList(CellLabel)';
CellLabel.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.oneOf([
		PropTypes.string,
		PropTypes.shape({
			label: PropTypes.string,
			// the bootstrap style info, danger, warning, success
			style: PropTypes.string,
		}),
	]),
	// The collection item index.
	rowIndex: PropTypes.number,
};

export default CellLabel;
