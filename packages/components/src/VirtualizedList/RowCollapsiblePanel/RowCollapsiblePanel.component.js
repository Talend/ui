import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { CellMeasurer } from 'react-virtualized';
import CollapsiblePanel from '../../CollapsiblePanel/CollapsiblePanel.component';
import { extractSpecialFields, getCellData, getId, getRowData } from '../utils/gridrow';

import withListGesture from '../../Gesture/withListGesture';
import css from './RowCollapsiblePanel.scss';

const DEFAULT_HEIGHT = 50;

/**
 * Row renderer that displays a Collapsible Panel
 */
class RowCollapsiblePanel extends React.Component {
	render() {
		const { className, index, onKeyDown, parent, style } = this.props;
		const { titleField } = extractSpecialFields(parent);

		const parentId = getId(parent);
		const id = parentId && `${parentId}-${index}`;
		const rowData = getRowData(parent, index);

		let onRowDoubleClick;

		if (parent.props.onRowDoubleClick) {
			onRowDoubleClick = event => parent.props.onRowDoubleClick({ event, rowData });
		}

		const onToggle = (event, measure) => {
			if (parent.props.onRowClick) {
				parent.props.onRowClick({ event, rowData: { ...rowData, index } });
				setTimeout(measure, 0);
			}
		};

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<CellMeasurer
				cache={parent.props.deferredMeasurementCache}
				columnIndex={0}
				key={index}
				parent={parent}
				rowIndex={index}
			>
				{({ measure }) => (
					<div
						className={classNames(css['tc-collapsible-row'], rowData.className, className)}
						id={id}
						onDoubleClick={onRowDoubleClick}
						onKeyDown={e => onKeyDown(e, this.ref)}
						ref={ref => {
							this.ref = ref;
						}}
						role="listitem"
						tabIndex="0"
						aria-posinset={index + 1}
						aria-setsize={parent.props.rowCount}
						aria-label={titleField && getCellData(titleField, parent, index)}
						style={{ ...style, maxHeight: rowData.expanded ? 'none' : `${DEFAULT_HEIGHT}px` }}
					>
						<CollapsiblePanel
							{...rowData}
							onToggle={event => onToggle(event, measure)}
							expanded={rowData.expanded}
							theme="panel-list"
						/>
					</div>
				)}
			</CellMeasurer>
		);
	}
}

RowCollapsiblePanel.displayName = 'VirtualizedList(RowCollapsiblePanel)';
RowCollapsiblePanel.propTypes = {
	/** Custom classname to set on the row */
	className: PropTypes.string,
	/** Row index */
	index: PropTypes.number,
	/** Keydown to handle focus gesture */
	onKeyDown: PropTypes.func.isRequired,
	/** Parent (ListGrid) component instance */
	parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** Custom style that react-virtualized provides */
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default withListGesture(RowCollapsiblePanel);
