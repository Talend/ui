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
import withListGesture from '../../Gesture/withListGesture';
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
		const { className, index, key, onKeyDown, parent, style } = this.props;
		const { titleField, selectionField, otherFields } = extractSpecialFields(parent);

		const parentId = getId(parent);
		const id = parentId && `${parentId}-${index}`;
		const titleCell = titleField && renderCell(index, parent, titleField, LARGE);
		const selectionCell = selectionField && renderCell(index, parent, selectionField);
		const rowData = getRowData(parent, index);

		let onRowClick;
		let onRowDoubleClick;
		if (parent.props.onRowClick) {
			onRowClick = event => parent.props.onRowClick({ event, rowData });
		}
		if (parent.props.onRowDoubleClick) {
			onRowDoubleClick = event => parent.props.onRowDoubleClick({ event, rowData });
		}

		return (
			<div
				className={classNames(
					'tc-list-item',
					'tc-list-large-row',
					rowThemes,
					rowData.className,
					className,
				)}
				id={id}
				key={key}
				onClick={onRowClick}
				onDoubleClick={onRowDoubleClick}
				onKeyDown={e => onKeyDown(e, this.ref)}
				style={style}
				ref={ref => {
					this.ref = ref;
				}}
				role="listitem"
				tabIndex="0"
				aria-posinset={index + 1}
				aria-setsize={parent.props.rowCount}
				aria-label={titleField && getCellData(titleField, parent, index)}
			>
				<div className={theme['inner-box']}>
					<div className={theme.header}>
						{titleCell}
						{selectionCell}
					</div>
					<dl className={`tc-list-large-content ${theme.content}`}>
						{otherFields.map((field, fieldIndex) => {
							const cellContent = renderCell(index, parent, field);
							const tooltip = typeof cellContent === 'string' ? cellContent : null;
							const label = getLabel(field);
							return (
								<div className={theme['field-group']} role="group">
									<dt key={fieldIndex} className={theme['field-label']}>
										{label && `${label}:`}
									</dt>
									<dd className={theme['field-value']} title={tooltip}>
										{cellContent}
									</dd>
								</div>
							);
						})}
					</dl>
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
	/**  */
	onKeyDown: PropTypes.string,
	/** Parent (ListGrid) component instance */
	parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** Custom style that react-virtualized provides */
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default withListGesture(RowLarge);
