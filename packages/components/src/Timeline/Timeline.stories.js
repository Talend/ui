import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { action } from '@storybook/addon-actions';

import IconsProvider from '../IconsProvider';
import Timeline from './Timeline.component';
import getLocale from '../DateFnsLocale/locale';
import { getCurrentLanguage } from '../translate';
import engine0 from './executions/engine-0.json';
import engine1 from './executions/engine-1.json';
import engine2 from './executions/engine-2.json';
import engines from './executions/engines-all.json';
import jsoEngine0 from './executions-jso/engine-0.json';
import jsoEngine1 from './executions-jso/engine-1.json';
import jsoEngine2 from './executions-jso/engine-2.json';
import jsoEngine3 from './executions-jso/engine-3.json';

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

export function Default() {
	return (
		<>
			<IconsProvider />
			<Timeline
				data={engine0}
				idName="context.executionId"
				caption={engine0[0].context.engine.name}
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
	return (
		<>
			<IconsProvider />
			<Timeline
				data={engine0}
				idName="context.executionId"
				caption={engine0[0].context.engine.name}
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
	return (
		<>
			<IconsProvider />
			<Timeline
				data={engine0}
				idName="context.executionId"
				caption={engine0[0].context.engine.name}
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
	return (
		<>
			<IconsProvider />
			<Timeline
				data={engine0}
				idName="context.executionId"
				caption={engine0[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
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
				data={engine0}
				idName="context.executionId"
				caption={engine0[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemPopover={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>{item.context.task.name}</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.time.start
								? format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.status.execution}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
			<hr />
			<Timeline
				data={engine1}
				idName="context.executionId"
				caption={engine1[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemPopover={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>{item.context.task.name}</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.time.start
								? format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.status.execution}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
			<hr />
			<Timeline
				data={engine2}
				idName="context.executionId"
				caption={engine2[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemPopover={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>{item.context.task.name}</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.time.start
								? format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.status.execution}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
			<hr />
			<Timeline
				data={engines}
				idName="context.executionId"
				caption={engine2[0].context.engine.name}
				startName="time.start"
				endName="time.end"
				groupIdName="context.task.id"
				groupLabelName="context.task.name"
				dataItemProps={getItemProps}
				dataItemPopover={item => (
					<dl>
						<dt>Flow name:</dt>
						<dd>{item.context.task.name}</dd>
						<dt>Start time:</dt>
						<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
						<dt>End time:</dt>
						<dd>
							{item.time.start
								? format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>{item.status.execution}</dd>
					</dl>
				)}
			>
				<Timeline.Grid />
			</Timeline>
		</>
	);
}

const TMCTimeline = ({ data, locale }) => (
	<Timeline
		data={data}
		idName="context.executionId"
		caption={data[0].context.engine.name}
		startName="time.start"
		endName="time.end"
		groupIdName="context.task.id"
		groupLabelName="context.task.name"
		dataItemProps={getItemProps}
		dataItemTooltip={item => (
			<dl>
				<dt>Flow name:</dt>
				<dd>{item.context.task.name}</dd>
				<dt>Start time:</dt>
				<dd>{format(new Date(item.time.start), 'DD MMM YYYY HH:mm:ss', locale)}</dd>
				<dt>End time:</dt>
				<dd>
					{item.time.start ? format(new Date(item.time.end), 'DD MMM YYYY HH:mm:ss', locale) : '-'}
				</dd>
				<dt>Status:</dt>
				<dd>
					(M) {item.status.management} - (E) {item.status.execution}
				</dd>
			</dl>
		)}
	>
		<Timeline.Toolbar>
			<Timeline.Zoom initialZoom={0.8} />
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
					item.fingerprint.logs?.map(({ timestamp, memory }) => ({ key: timestamp, value: memory }))
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
export function Chart() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	return (
		<>
			<IconsProvider />
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoEngine0} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoEngine1} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoEngine2} locale={locale} />
				</div>
				<div style={{ flex: '1', padding: '3rem 5rem', maxWidth: '50%', border: '1px solid grey' }}>
					<TMCTimeline data={jsoEngine3} locale={locale} />
				</div>
			</div>
		</>
	);
}
