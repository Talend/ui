import { Unstyled } from '@storybook/blocks';
import { StackHorizontal, StackItem } from '@talend/design-system';
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
			<StackHorizontal gap="XS" as="ul" role="list" align="center" margin={{ x: 0, y: 'M' }}>
				{Object.entries(statuses).map(([statusType, { status, link }]) => (
					<StackItem as="li" key={statusType}>
						<Status
							{...{
								status,
								link,
								icon: getIcon(statusType as StatusType),
								label: statusType,
							}}
						/>
					</StackItem>
				))}
			</StackHorizontal>
		</Unstyled>
	);
}
