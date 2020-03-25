import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DateFilter from './DateFilter.component';
import Zoom from './Zoom.component';
import Grid from './Grid.component';
import useGroups from './useGroups';
import useTimeRange from './useTimeRange';
import useFilters from './useFilters';
import { TimelineContext } from './context';
import theme from './Timeline.scss';

function Toolbar({ children }) {
	return <div className={theme.toolbar}>{children}</div>;
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
}) {
	const [zoom, setZoom] = useState(1);
	const groups = useGroups(data, { groupIdName, groupLabelName, startName, endName });
	const { filters, addFilters, removeFilters } = useFilters();
	const [timeRange, setTimeRange] = useTimeRange(groups, {
		addFilters,
		removeFilters,
		startName,
		endName,
	});
	const filteredData = useMemo(
		() =>
			groups.map(group => ({
				...group,
				items: group.items.filter(item => filters.every(({ predicate }) => predicate(item))),
			})),
		[groups, filters],
	);

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
};
Timeline.Toolbar = Toolbar;
Timeline.DateFilter = DateFilter;
Timeline.Zoom = Zoom;
Timeline.Grid = Grid;
