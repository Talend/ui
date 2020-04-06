import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DateFilter from './DateFilter.component';
import Zoom from './Zoom.component';
import Grid from './Grid.component';
import Chart from './Chart.component';
import useGridMeasures from './useGridMeasures';
import useGroups from './useGroups';
import useTimeRange from './useTimeRange';
import useFilters from './useFilters';
import { TimelineContext, useTimelineContext } from './context';
import theme from './Timeline.scss';

function Toolbar({ children }) {
	return <div className={theme.toolbar}>{children}</div>;
}

function Body({ children }) {
	const { measures } = useTimelineContext();
	return (
		<div className={theme.body} style={{ width: '100%', overflowX: 'auto' }}>
			<div style={{ width: measures.total.widthUnit }}>{children}</div>
		</div>
	);
}

export default function Timeline({
	data = [],
	children,
	idName = 'id',
	startName = 'start',
	endName = 'end',
	groupIdName = 'groupId',
	groupLabelName = 'groupLabel',
	caption = '',
	dataItemProps = () => ({}),
	dataItemPopover,
	dataItemTooltip,
	onClick,
	timeRange: timeRangeFromProps,
}) {
	const [zoom, setZoom] = useState(1);
	const groups = useGroups(data, { groupIdName, groupLabelName, startName, endName });
	const { filters, addFilters, removeFilters } = useFilters();
	const [timeRange, setTimeRange] = useTimeRange(
		{ timeRangeFromProps, groups },
		{
			addFilters,
			removeFilters,
			startName,
			endName,
		},
	);
	const filteredData = useMemo(
		() =>
			groups.map(group => ({
				...group,
				items: group.items.filter(item => filters.every(({ predicate }) => predicate(item))),
			})),
		[groups, filters],
	);
	const measures = useGridMeasures({ data: filteredData, timeRange, zoom });

	return (
		<TimelineContext.Provider
			value={{
				filters,
				addFilters,
				removeFilters,
				data: filteredData,
				idName,
				startName,
				endName,
				groupIdName,
				groupLabelName,
				caption,
				dataItemProps,
				dataItemPopover,
				dataItemTooltip,
				onClick,
				zoom,
				setZoom,
				timeRange,
				setTimeRange,
				measures,
			}}
		>
			<div className={theme.layout}>{children}</div>
		</TimelineContext.Provider>
	);
}

Timeline.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	children: PropTypes.node,
	startName: PropTypes.string,
	endName: PropTypes.string,
	groupIdName: PropTypes.string,
	groupLabelName: PropTypes.string,
	dataItemProps: PropTypes.func,
	dataItemTooltip: PropTypes.func,
	timeRange: PropTypes.arrayOf(PropTypes.number),
};
Timeline.Toolbar = Toolbar;
Timeline.Body = Body;
Timeline.DateFilter = DateFilter;
Timeline.Zoom = Zoom;
Timeline.Grid = Grid;
Timeline.Chart = Chart;
