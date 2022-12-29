import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';
import TooltipTrigger from '../TooltipTrigger';
import Skeleton from '../Skeleton';

function renderDefaultCell(cellData) {
	const value = typeof cellData === 'object' ? cellData.value : cellData;
	return cellData?.isLoading ? (
		<Skeleton />
	) : (
		<div className="tc-virtualizedlist-default-cell">{value}</div>
	);
}

function DefaultRenderer({ cellData, columnData, rowData }) {
	const { getTooltipLabel } = columnData;
	let tooltipLabel = columnData.tooltipLabel || cellData;
	if (typeof getTooltipLabel === 'function') {
		tooltipLabel = getTooltipLabel(rowData);
	}
	return tooltipLabel ? (
		<TooltipTrigger label={tooltipLabel} tooltipPlacement={columnData.tooltipPlacement || 'top'}>
			{renderDefaultCell(cellData)}
		</TooltipTrigger>
	) : (
		renderDefaultCell(cellData)
	);
}
DefaultRenderer.propTypes = {
	cellData: PropTypes.oneOfType(PropTypes.string, {
		isLoading: PropTypes.bool,
		value: PropTypes.string,
	}),
	rowData: PropTypes.object,
	columnData: PropTypes.shape({
		tooltipLabel: PropTypes.string,
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
