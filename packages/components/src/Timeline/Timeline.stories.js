import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
import { action } from '@storybook/addon-actions';

import IconsProvider from '../IconsProvider';
import Timeline from './Timeline.component';
import getLocale from '../DateFnsLocale/locale';
import { getCurrentLanguage } from '../translate';
import jsoEngine0 from './executions-jso/engine-0.json';

export default {
	title: 'Data/Timeline',

	parameters: {
		component: Timeline,
	},
};

const getItemProps = ({ status }) => {
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
	return { style: { background }, className };
};

export function Default() {
	return (
		<>
			<IconsProvider />
			<Timeline
				data={jsoEngine0}
				idName="context.executionId"
				caption={jsoEngine0[0].context.engine.name}
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
				data={jsoEngine0}
				idName="context.executionId"
				caption={jsoEngine0[0].context.engine.name}
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
				data={jsoEngine0}
				idName="context.executionId"
				caption={jsoEngine0[0].context.engine.name}
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
				data={jsoEngine0}
				idName="context.executionId"
				caption={jsoEngine0[0].context.engine.name}
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
							{item.time.end
								? format(new Date(item.time.end), 'DD MMM YYYY HH:mm:ss', locale)
								: '-'}
						</dd>
						<dt>Status:</dt>
						<dd>
							(M) {item.status.management} - (E) {item.status.execution}
						</dd>
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
				data={jsoEngine0}
				idName="context.executionId"
				caption={jsoEngine0[0].context.engine.name}
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
								? format(new Date(item.time.end), 'DD MMM YYYY HH:mm:ss', locale)
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
					{item.time.end ? format(new Date(item.time.end), 'DD MMM YYYY HH:mm:ss', locale) : '-'}
				</dd>
				<dt>Status:</dt>
				<dd>{item.status.execution}</dd>
			</dl>
		)}
	>
		<Timeline.Toolbar>
			<Timeline.Zoom />
		</Timeline.Toolbar>
		<Timeline.Grid />>
		<Timeline.LineChart />
	</Timeline>
);
export function TasksByEngines() {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	return (
		<>
			<IconsProvider />
			<TMCTimeline data={jsoEngine0} locale={locale} />
		</>
	);
}
