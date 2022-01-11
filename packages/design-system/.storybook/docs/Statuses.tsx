import React, { FunctionComponent, Suspense, useEffect, useState } from 'react';
import { addons } from '@storybook/addons';

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

type StoriesWithStatus = { [componentName: string]: ComponentStatus };

export const toEmoji = (status?: Status) => {
	switch (status) {
		case Status.OK:
			return '✅';
		case Status.KO:
			return '❌';
		case Status.WIP:
			return '⏱';
		case Status.NA:
			return '❎';
		default:
			return '❔';
	}
};

const Statuses = (props: FunctionComponent) => {
	const [statuses, setStatuses] = useState<StoriesWithStatus>();

	useEffect(() => {
		channel.on('SET_STATUSES_BY_PAGE', setStatuses);
		return () => channel.off('SET_STATUSES_BY_PAGE', setStatuses);
	}, [channel]);

	return (
		<Suspense fallback={<span>Loading status...</span>}>
			<table className="sbdocs sbdocs-table" {...props}>
				<thead>
					<tr>
						<th>Component</th>
						<th align={'center'}>Figma</th>
						<th align={'center'}>Storybook</th>
						<th align={'center'}>React</th>
						<th align={'center'}>i18n</th>
					</tr>
				</thead>
				<tbody>
					{statuses &&
						Object.entries(statuses).map(
							([name, status = {}]: [name: string, status: ComponentStatus], key) => {
								const { figma, react, storybook, i18n } = status;
								return (
									<tr key={key}>
										<td>{name}</td>
										<td align={'center'}>{toEmoji(figma)}</td>
										<td align={'center'}>{toEmoji(storybook)}</td>
										<td align={'center'}>{toEmoji(react)}</td>
										<td align={'center'}>{toEmoji(i18n)}</td>
									</tr>
								);
							},
						)}
				</tbody>
			</table>
		</Suspense>
	);
};

export default Statuses;
