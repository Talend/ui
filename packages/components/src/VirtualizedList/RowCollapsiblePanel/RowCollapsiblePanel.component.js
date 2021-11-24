import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';

import Skeleton from '../../Skeleton';
import CollapsiblePanel from '../../CollapsiblePanel/CollapsiblePanel.component';
import { getId, getRowData } from '../utils/gridrow';

import withListGesture from '../../Gesture/withListGesture';
import theme from './RowCollapsiblePanel.scss';

const cache = new CellMeasurerCache({ fixedWidth: true });
const options = {
	deferredMeasurementCache: cache,
	rowHeight: cache.rowHeight,
};

function LoadingCollapsiblePanel() {
	return (
		<div className={theme['loading-collapsible-panel']}>
			<span>
				<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.xlarge} />
			</span>
			<span>
				<Skeleton type={Skeleton.TYPES.circle} size={Skeleton.SIZES.small} />
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.medium} />
			</span>
			<span>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.small} />
			</span>
			<span>
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.medium} />
			</span>
		</div>
	);
}

const MemoLoadingCollapsiblePanel = React.memo(LoadingCollapsiblePanel);

/**
 * Row renderer that displays a Collapsible Panel
 */
class RowCollapsiblePanel extends React.Component {
	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle(event) {
		const { parent, index } = this.props;
		if (parent.props.onRowClick) {
			parent.props.onRowClick({ event, rowData: { ...getRowData(parent, index), index } });
		}
	}

	render() {
		const { className, index, onKeyDown, parent, style } = this.props;

		const parentId = getId(parent);
		const id = parentId && `${parentId}-${index}`;
		const rowData = getRowData(parent, index);

		return (
			<CellMeasurer cache={cache} columnIndex={0} key={index} parent={parent} rowIndex={index}>
				{({ measure }) => (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<div
						className={classNames('tc-collapsible-row', rowData.className, className)}
						id={id}
						onKeyDown={e => onKeyDown(e, this.ref)}
						ref={ref => {
							this.ref = ref;
						}}
						role="listitem"
						tabIndex="0"
						aria-posinset={index + 1}
						aria-setsize={parent.props.rowCount}
						aria-label={get(rowData, 'header[0].label')}
						style={style}
					>
						{isEmpty(rowData) ? (
							<MemoLoadingCollapsiblePanel />
						) : (
							<CollapsiblePanel
								onEntered={measure}
								onExited={measure}
								onToggle={this.onToggle}
								{...rowData}
							/>
						)}
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

const RowCollapsiblePanelWrapper = withListGesture(RowCollapsiblePanel);
RowCollapsiblePanelWrapper.options = options;

export default RowCollapsiblePanelWrapper;
