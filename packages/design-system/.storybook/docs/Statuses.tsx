import React from 'react';
import { addons } from '@storybook/addons';

const channel = addons.getChannel();

enum Status {
	OK = 'ok',
	KO = 'ko',
	WIP = 'wip',
	NC = 'nc',
}

type ComponentStatus = {
	figma?: Status;
	react?: Status;
	storybook?: Status;
	i18n?: Status;
};

const Statuses = props => {
	const [statuses, setStatuses] = React.useState();

	React.useEffect(() => {
		channel.on('STATUS_BY_PAGE', setStatuses);
		return () => channel.off('STATUS_BY_PAGE', setStatuses);
	}, [channel]);

	const getEmoji = React.useCallback(str => {
		switch (str?.toLocaleLowerCase()) {
			case Status.OK:
				return '✅';
			case Status.KO:
				return '❌';
			case Status.WIP:
				return '⏱';
			case Status.NC:
				return '❎';
			default:
				return '❔';
		}
	}, []);

	return !statuses ? (
		<span>Loading status...</span>
	) : (
		<table className="sbdocs sbdocs-table" {...props}>
			<thead>
				<tr>
					<th>Component</th>
					<th align={'center'}>Figma</th>
					<th align={'center'}>React</th>
					<th align={'center'}>Storybook</th>
					<th align={'center'}>i18n</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(statuses).map(
					([name, status = {}]: [name: string, status: ComponentStatus], key) => {
						const { figma, react, storybook, i18n } = status;
						return (
							<tr key={key}>
								<td>{name}</td>
								<td align={'center'}>{getEmoji(figma)}</td>
								<td align={'center'}>{getEmoji(react)}</td>
								<td align={'center'}>{getEmoji(storybook)}</td>
								<td align={'center'}>{getEmoji(i18n)}</td>
							</tr>
						);
					},
				)}
			</tbody>
		</table>
	);
};

export default Statuses;
