import { Unstyled } from '@storybook/blocks';
import { Status } from './Status';
import { Statuses, StatusType } from './Statuses.types';

const iconByStatusType = {
	[StatusType.figma]: 'figma',
	[StatusType.i18n]: 'i18next',
	[StatusType.react]: 'react',
	[StatusType.storybook]: 'storybook',
};

function getIcon(statusType: StatusType) {
	return `https://unpkg.com/simple-icons/icons/${iconByStatusType[statusType]}.svg`;
}

export function ComponentStatuses(statuses: Statuses) {
	return (
		<Unstyled>
			<ul style={{ listStyleType: 'none', width: 400 }}>
				{Object.entries(statuses).map(([statusType, { status, link }]) => (
					<li key={statusType} style={{ display: 'inline', marginRight: 4 }}>
						<Status
							{...{
								status,
								link,
								icon: getIcon(statusType as StatusType),
								label: statusType,
							}}
						/>
					</li>
				))}
			</ul>
		</Unstyled>
	);
}
