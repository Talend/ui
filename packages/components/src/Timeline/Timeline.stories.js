import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { action } from '@storybook/addon-actions';

import IconsProvider from '../IconsProvider';
import Icon from '../Icon';
import Timeline from './Timeline.component';
import getLocale from '../DateFnsLocale/locale';
import { getCurrentLanguage } from '../translate';

import jsoExecutionsByWeek from './executions/week';
import jsoExecutionsByDay from './executions/day';
import jsoExecutionsByHour from './executions/hour';

export default {
	title: 'Data/Timeline',

	parameters: {
		component: Timeline,
	},
};

const locale = getCurrentLanguage();
const options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};
const dateFormat = Intl.DateTimeFormat(locale, options);

const getItemProps = ({ status, flowName, startTimestamp, finishTimestamp }) => {
	const background =
		status.management === 'abort' || status.execution === 'abort'
			? '#f3c446'
			: status.management === 'deploy_failure' ||
			  status.management === 'undeploy_failure' ||
			  status.execution === 'failure'
			? '#e96065'
			: status.management === 'successful' && status.execution === 'successful'
			? '#82bd41'
			: '#236192';
	const className = background === '#236192' ? 'running' : '';

	const content = `Execution ${flowName} started at ${dateFormat.format(
		startTimestamp,
	)} finished at ${dateFormat.format(finishTimestamp)} with status ${status.execution}`;
	return { style: { background }, className, content };
};

const getItemDetails = (item, locale) => (
	<dl>
		<dt>Flow name:</dt>
		<dd>{item.flowName}</dd>
		<dt>Start time:</dt>
		<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
		<dt>End time:</dt>
		<dd>{item.time.end ? format(new Date(item.time.end), 'DD MMM YYYY HH:mm:ss', locale) : '-'}</dd>
		<dt>Status:</dt>
		<dd>
			(M) {item.status.management} - (E) {item.status.execution}
		</dd>
	</dl>
);

export function Default() {
	const data = jsoExecutionsByDay[0][0][0].executions;
	return (
		<>
			<IconsProvider />
			<Timeline
				data={data}
				idName="context.executionId"
				caption={data[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				onClick={action('onClick')}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function Zoom() {
	const data = jsoExecutionsByDay[0][0][0].executions;
	return (
		<>
			<IconsProvider />
			<Timeline
				data={data}
				idName="context.executionId"
				caption={data[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
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
	const data = jsoExecutionsByDay[0][0][0].executions;
	return (
		<>
			<IconsProvider />
			<Timeline
				data={data}
				idName="context.executionId"
				caption={data[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
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
	const data = jsoExecutionsByDay[0][0][0].executions;
	return (
		<>
			<IconsProvider />
			<Timeline
				data={data}
				idName="context.executionId"
				caption={data[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemTooltip={item => getItemDetails(item, locale)}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

export function Popover() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const data = jsoExecutionsByDay[0][0][0].executions;
	return (
		<>
			<IconsProvider />
			<Timeline
				data={data}
				idName="context.executionId"
				caption={data[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemPopover={item => getItemDetails(item, locale)}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

function ScaleTimeline({ dataArray, initialIndex }) {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const [index, setIndex] = useState(initialIndex);
	const { timeRange, engine = 'Missing engine name', executions } = dataArray[index];
	return (
		<>
			<IconsProvider />
			<Timeline
				data={executions}
				idName="context.executionId"
				caption={engine}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemTooltip={item => getItemDetails(item, locale)}
				timeRange={timeRange}
			>
				<Timeline.Toolbar>
					<button
						onClick={() => setIndex(index - 1)}
						disabled={index <= 0}
						arial-label="Previous time range"
						className="btn btn-link btn-icon-only"
					>
						<Icon name="talend-chevron-left" />
					</button>
					<button
						style={{ marginLeft: 'auto' }}
						onClick={() => setIndex(index + 1)}
						disabled={index >= dataArray.length - 1}
						arial-label="Next time range"
						className="btn btn-link btn-icon-only"
					>
						<Icon name="talend-chevron-left" transform="rotate-180" />
					</button>
				</Timeline.Toolbar>
				<Timeline.Body>
					<Timeline.Grid />
				</Timeline.Body>
			</Timeline>
		</>
	);
}
export const ScaleWeek = () => (
	<ScaleTimeline dataArray={jsoExecutionsByWeek[0]} initialIndex={0} />
);
export const ScaleDay = () => (
	<ScaleTimeline dataArray={jsoExecutionsByDay[0][0]} initialIndex={0} />
);
export const ScaleHour = () => (
	<ScaleTimeline dataArray={jsoExecutionsByHour[0][0][0]} initialIndex={0} />
);

const TMCTimeline = ({ data, locale }) => {
	const { executions, engine, timeRange } = data;
	return (
		<Timeline
			data={executions}
			idName="context.executionId"
			caption={engine}
			startName="time.start"
			endName="time.end"
			groupIdName="context.task.id"
			groupLabelName="context.task.name"
			dataItemProps={getItemProps}
			dataItemTooltip={item => getItemDetails(item, locale)}
		>
			<Timeline.Toolbar>
				<Timeline.Zoom />
			</Timeline.Toolbar>
			<Timeline.Body>
				<Timeline.Grid />
				<Timeline.Chart
					caption="CPU usage"
					getItemValues={item =>
						item.fingerprint.logs?.map(({ timestamp, cpu }) => ({ key: timestamp, value: cpu }))
					}
					labelFormatter={timestamp => format(timestamp, 'DD MMM YYYY HH:mm:ss', locale)}
					valueFormatter={(value, _, props) =>
						`${value}%. Max usage: ${props.payload.max.label} (${props.payload.max.value}%)`
					}
					color="#272288"
				/>
				<Timeline.Chart
					caption="Memory usage"
					getItemValues={item =>
						item.fingerprint.logs?.map(({ timestamp, memory }) => ({
							key: timestamp,
							value: memory,
						}))
					}
					labelFormatter={timestamp => format(timestamp, 'DD MMM YYYY HH:mm:ss', locale)}
					valueFormatter={(value, _, props) =>
						`${value}Mo. Max usage: ${props.payload.max.label} (${props.payload.max.value}Mo)`
					}
					color="#5d882f"
				/>
			</Timeline.Body>
		</Timeline>
	);
};
export function Chart() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const data = jsoExecutionsByDay[0][0][0];
	return (
		<>
			<IconsProvider />
			<TMCTimeline data={data} locale={locale} />
		</>
	);
}

export function Mozaic() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	return (
		<>
			<IconsProvider />
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoExecutionsByDay[0][0][0]} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoExecutionsByDay[1][0][0]} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoExecutionsByDay[2][0][0]} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoExecutionsByDay[3][0][0]} locale={locale} />
				</div>
			</div>
		</>
	);
}
