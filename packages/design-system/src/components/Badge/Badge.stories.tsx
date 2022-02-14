import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { Badge } from '.';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonSecondary } from '../Button';

export default {
	component: Badge,
};

export const SimpleBadge = {
	render: (props: Story<typeof Badge>) => (
		<Badge label="Lorem ipsum" onRemove={action('remove')} {...props} />
	),
};

export const SimpleBadges = {
	render: () => {
		const [badgeValues, setBadgeValues] = useState<string[]>([]);

		const onAddUser = (
			event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent | undefined,
			value?: string,
		) => {
			badgeValues.push(value || faker.name.findName());
			setBadgeValues([...badgeValues]);
		};

		const onRemoveUser = (
			event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent | undefined,
			value: string,
		) => {
			setBadgeValues([...badgeValues.filter(badgeValue => badgeValue !== value)]);
		};

		useEffect(() => {
			onAddUser(undefined, 'John doe');
			onAddUser(undefined, 'Jane doe');
		}, []);

		return (
			<StackHorizontal gap="XXS" wrap="wrap">
				{badgeValues.map((badgeValue, key) => (
					<Badge key={key} label={badgeValue} onRemove={e => onRemoveUser(e, badgeValue)} />
				))}
				<ButtonSecondary onClick={onAddUser} size="S">
					Add random user
				</ButtonSecondary>
			</StackHorizontal>
		);
	},
};

export const NotRemovableBadge = {
	render: (props: Story<typeof Badge>) => (
		<Badge
			label="Environment"
			aria-label="Switch between environments"
			values={['Development', 'Staging', 'Production']}
			defaultValue="Production"
			onChange={action('onChange')}
			{...props}
		/>
	),
};

export const NotRemovableBadges = {
	render: () => {
		const [currentEnvironmentValue, setCurrentEnvironmentValue] = useState('Production');
		const [currentPeriodValue, setCurrentPeriodValue] = useState('Last 24 hours');
		const onEnvironmentValueChange = (
			event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
			{ label }: { label: string },
		) => {
			setCurrentEnvironmentValue(label);
		};
		const onPeriodValueChange = (
			event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
			{ label }: { label: string },
		) => {
			setCurrentPeriodValue(label);
		};
		return (
			<StackVertical gap="S">
				<StackHorizontal gap="S" align="center">
					<Badge
						label="Environment"
						aria-label="Switch between environments"
						values={['Production', 'Staging', 'Development']}
						defaultValue={currentEnvironmentValue}
						onChange={onEnvironmentValueChange}
					/>
					<Badge
						label="Period"
						aria-label="Switch between time ranges"
						values={['Last 24 hours', 'Last 3 days', 'Last 7 days', 'Last 30 days']}
						defaultValue={currentPeriodValue}
						onChange={onPeriodValueChange}
					/>
				</StackHorizontal>
				<span>
					Now, you're seeing all records coming from <em>{currentEnvironmentValue}</em> environment
					for the <em>{currentPeriodValue}</em>.
				</span>
			</StackVertical>
		);
	},
};
