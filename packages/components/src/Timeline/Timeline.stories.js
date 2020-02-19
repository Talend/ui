import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { action } from '@storybook/addon-actions';

import IconsProvider from '../IconsProvider';
import Timeline from './Timeline.component';
import activity from './story/activity';
import getLocale from '../DateFnsLocale/locale';

export default {
	title: 'Data/Timeline',

	parameters: {
		component: Timeline,
	},
};

const getItemProps = ({ flowStatus, flowName, startTimestamp, finishTimestamp }) => {
	const background =
		flowStatus === 'EXECUTION_REJECTED'
			? '#f3c446'
			: flowStatus === 'DEPLOY_FAILED' || flowStatus === 'EXECUTION_FAILED'
			? '#e96065'
			: flowStatus === 'EXECUTION_SUCCESS' || flowStatus === 'EXECUTION_TERMINATED'
			? '#82bd41'
			: '#236192';
	const className = background === '#236192' ? 'running' : '';
	const ariaLabel = `Status: ${flowStatus}`;
	return { style: { background }, className, 'aria-label': ariaLabel };
};

export function Default() {
	return (
		<>
			<IconsProvider />
			<Timeline
				data={activity}
				idName="flowExecutionId"
				startName="startTimestamp"
				endName="finishTimestamp"
				groupIdName="flowId"
				groupLabelName="flowName"
				dataItemProps={getItemProps}
				onClick={action('onClick')}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function Zoom() {
	return (
		<>
			<IconsProvider />
			<Timeline
				data={activity}
				idName="flowExecutionId"
				startName="startTimestamp"
				endName="finishTimestamp"
				groupIdName="flowId"
				groupLabelName="flowName"
				dataItemProps={getItemProps}
			>
				<Timeline.Toolbar>
					<Timeline.Zoom />
				</Timeline.Toolbar>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function DateFilter() {
	return (
		<>
			<IconsProvider />
			<Timeline
				data={activity}
				idName="flowExecutionId"
				startName="startTimestamp"
				endName="finishTimestamp"
				groupIdName="flowId"
				groupLabelName="flowName"
				dataItemProps={getItemProps}
			>
				<Timeline.Toolbar>
					<Timeline.DateFilter id="date-filter" />
				</Timeline.Toolbar>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function Tooltip() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	return (
		<>
			<IconsProvider />
			<Timeline
				data={activity}
				idName="flowExecutionId"
				startName="startTimestamp"
				endName="finishTimestamp"
				groupIdName="flowId"
				groupLabelName="flowName"
				dataItemProps={getItemProps}
				dataItemTooltip={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>{item.flowName}</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.startTimestamp), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.finishTimestamp
								? format(new Date(item.finishTimestamp), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.flowStatus}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function Popover() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	return (
		<>
			<IconsProvider />
			<Timeline
				data={activity}
				idName="flowExecutionId"
				startName="startTimestamp"
				endName="finishTimestamp"
				groupIdName="flowId"
				groupLabelName="flowName"
				dataItemProps={getItemProps}
				dataItemPopover={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
							{item.flowName}
						</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.startTimestamp), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.finishTimestamp
								? format(new Date(item.finishTimestamp), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.flowStatus}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}
