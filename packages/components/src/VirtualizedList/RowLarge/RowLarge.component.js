import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	extractSpecialFields,
	getCellData,
	getId,
	getLabel,
	getRowData,
	renderCell,
} from '../utils/gridrow';

import { listTypes } from '../utils/constants';
import rowThemes from './RowThemes';
import theme from './RowLarge.scss';

const { LARGE } = listTypes;

/**
 * Row renderer that displays a Large item
 */
class RowLarge extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.className !== nextProps.className ||
			this.props.index !== nextProps.index ||
			this.props.key !== nextProps.key ||
			this.props.parent !== nextProps.parent ||
			this.props.style !== nextProps.style
		);
	}

	render() {
		const { className, index, key, parent, style } = this.props;
		const { titleField, selectionField, otherFields } = extractSpecialFields(parent);

		const parentId = getId(parent);
		const id = parentId && `${parentId}-${index}`;
		const titleCell = titleField && renderCell(index, parent, titleField, LARGE);
		const selectionCell = selectionField && renderCell(index, parent, selectionField);
		const rowData = getRowData(parent, index);
		const otherCellsListItems = (
			<dl>
				{otherFields.map((field, fieldIndex) => {
					if (fieldIndex > 0) {
						return null;
					}
					const cellContent = renderCell(index, parent, field);
					const tooltip = typeof cellContent === 'string' ? cellContent : null;
					const label = getLabel(field);
					return [
						<dt key={fieldIndex}>
							{label && <span className={theme['field-label']}>{label}: </span>}
						</dt>,
						<dd className={theme['field-value']} title={tooltip}>
							{cellContent}
						</dd>,
					];
				})}
			</dl>
		);

		let onRowClick;
		let onRowDoubleClick;
		if (parent.props.onRowClick) {
			onRowClick = event => parent.props.onRowClick({ event, rowData });
		}
		if (parent.props.onRowDoubleClick) {
			onRowDoubleClick = event => parent.props.onRowDoubleClick({ event, rowData });
		}

		return (
			<div role="row" aria-rowindex={index + 1}>
				<div
					role="gridcell"
					aria-colindex={1}
					aria-label={titleField && getCellData(titleField, parent, index)}
				>
					<div
						className={classNames('tc-list-item', rowThemes, rowData.className)}
						key={key}
						role="button"
						onClick={onRowClick}
						onDoubleClick={onRowDoubleClick}
						style={style}
						tabIndex="0"
					>
						{selectionCell}
						<dl className={`tc-list-large-row ${theme['inner-box']} ${className}`} id={id}>
							<dt>{titleCell}</dt>
							<dd>{otherCellsListItems}</dd>
						</dl>
					</div>
				</div>
			</div>
		);
	}
}

RowLarge.displayName = 'VirtualizedList(RowLarge)';
RowLarge.propTypes = {
	/** Custom classname to set on the row */
	className: PropTypes.string,
	/** Row index */
	index: PropTypes.number,
	/** Row technical key to identify this row for React consolidation */
	key: PropTypes.string,
	/** Parent (ListGrid) component instance */
	parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** Custom style that react-virtualized provides */
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default RowLarge;
