import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { addons } from '@storybook/addons';
import tokens from '@talend/design-tokens';

import theme from './StatusTable.scss';

const channel = addons.getChannel();

export enum Status {
	OK = 'ok',
	KO = 'ko',
	WIP = 'wip',
	NA = 'na',
}

export type ComponentStatus = {
	figma?: Status;
	storybook?: Status;
	react?: Status;
	i18n?: Status;
};

type StoriesWithStatus = {
	[componentName: string]: { title: string; componentId: string; status?: ComponentStatus };
};

export const toEmoji = (status?: Status) => {
	switch (status) {
		case Status.OK:
			return (
				<span
					style={{
						color: tokens.coralColorSuccessText,
						background: tokens.coralColorSuccessBackground,
					}}
				>
					OK
				</span>
			);
		case Status.KO:
			return (
				<span
					style={{
						color: tokens.coralColorDangerText,
						background: tokens.coralColorDangerBackground,
					}}
				>
					KO
				</span>
			);
		case Status.WIP:
			return (
				<span
					style={{
						color: tokens.coralColorBetaText,
						background: tokens.coralColorDangerBackground,
					}}
				>
					WIP
				</span>
			);

		case Status.NA:
			return <span style={{}}>N/A</span>;

		default:
			return '❔';
	}
};

const StatusTable = (props: FunctionComponent) => {
	const [statuses, setStatuses] = useState<StoriesWithStatus>();

	useEffect(() => {
		channel.on('SET_STATUSES_BY_PAGE', setStatuses);
		return () => channel.off('SET_STATUSES_BY_PAGE', setStatuses);
	}, [channel]);

	return (
		<Suspense fallback={<span>Loading status...</span>}>
			<table className={`sbdocs sbdocs-table ${theme.table}`} {...props}>
				<thead>
					<tr>
						<th>Component</th>
						<th>Figma</th>
						<th>Storybook</th>
						<th>React</th>
						<th>i18n</th>
					</tr>
				</thead>
				<tbody>
					{statuses &&
						Object.entries(statuses).map(([name, parameters], key) => {
							const { figma, react, storybook, i18n } = parameters.status || {};
							return (
								<tr key={key}>
									<td>
										<a href={`/?path=/docs/${parameters.componentId}`}>{parameters.title}</a>
									</td>
									<td>{toEmoji(figma)}</td>
									<td>{toEmoji(storybook)}</td>
									<td>{toEmoji(react)}</td>
									<td>{toEmoji(i18n)}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</Suspense>
	);
};

export default StatusTable;
