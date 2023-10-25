/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';
import TooltipTrigger from '../TooltipTrigger';

function DefaultRenderer({ cellData, columnData, rowData }) {
	const { getTooltipLabel } = columnData;
	let tooltipLabel = columnData.tooltipLabel != null ? columnData.tooltipLabel : cellData;
	if (typeof getTooltipLabel === 'function') {
		tooltipLabel = getTooltipLabel(rowData);
	}
	return tooltipLabel != null ? (
		<TooltipTrigger label={tooltipLabel} tooltipPlacement={columnData.tooltipPlacement || 'top'}>
			<div
				className="tc-virtualizedlist-default-cell"
				data-test="tc-virtualizedlist-default-cell-tooltip"
				data-testid="tc-virtualizedlist-default-cell-tooltip"
			>
				{cellData}
			</div>
		</TooltipTrigger>
	) : (
		<div className="tc-virtualizedlist-default-cell">{cellData}</div>
	);
}
DefaultRenderer.propTypes = {
	cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rowData: PropTypes.object,
	columnData: PropTypes.shape({
		tooltipLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		tooltipPlacement: PropTypes.string,
		getTooltipLabel: PropTypes.func,
	}),
};

export const defaultColumnConfiguration = {
	...Column.defaultProps,
	cellRenderer: DefaultRenderer,
	width: -1,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function Content() {
	return null;
}
Content.displayName = 'Content';
Content.defaultProps = defaultColumnConfiguration;
Content.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	dataKey: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	columnData: PropTypes.shape({
		tooltipLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		tooltipPlacement: PropTypes.string,
		getTooltipLabel: PropTypes.func,
	}).isRequired,
};
