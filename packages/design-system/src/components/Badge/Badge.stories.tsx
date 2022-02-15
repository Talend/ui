import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import BadgePrimitive from './primitive/Badge';
import { Badge, BadgeFixed } from '.';
import { StackHorizontal, StackVertical } from '../Stack';
import { ButtonSecondary } from '../Button';

const lorem2lines = faker.lorem.lines(2);

export default {
	component: BadgePrimitive,
};

export const SimpleBadge = {
	render: (props: Story<typeof Badge>) => (
		<Badge label="Lorem ipsum" onRemove={action('remove')} {...props} />
	),
};

export const SimpleBadgeWithEllipsis = {
	render: (props: Story<typeof Badge>) => (
		<Badge label={lorem2lines} onRemove={action('remove')} {...props} />
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
	render: (props: Story<typeof BadgePrimitive>) => (
		<BadgeFixed
			label="Environment"
			aria-label="Switch between environments"
			values={['Development', 'Staging', 'Production']}
			defaultValue="Production"
			onChange={action('onChange')}
			{...props}
		/>
	),
};

export const NotRemovableBadgeWithEllipsisOnLabel = {
	render: (props: Story<typeof BadgePrimitive>) => (
		<BadgeFixed
			label={lorem2lines}
			values={['Development', 'Staging', 'Production']}
			defaultValue="Production"
			onChange={action('onChange')}
			{...props}
		/>
	),
};
export const NotRemovableBadgeWithEllipsisOnValue = {
	render: (props: Story<typeof BadgePrimitive>) => (
		<BadgeFixed
			label="Lorem ipsum"
			values={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				'Maecenas diam nisl, mollis quis tortor in, molestie ultricies sem.',
				'Ut laoreet orci vel dui placerat sodales.',
			]}
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			onChange={action('onChange')}
			{...props}
		/>
	),
};
export const NotRemovableBadgeWithEllipsisOnBoth = {
	render: (props: Story<typeof BadgePrimitive>) => (
		<BadgeFixed
			label={lorem2lines}
			values={[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				'Maecenas diam nisl, mollis quis tortor in, molestie ultricies sem.',
				'Ut laoreet orci vel dui placerat sodales.',
			]}
			defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
					<BadgeFixed
						label="Environment"
						aria-label="Switch between environments"
						values={['Production', 'Staging', 'Development']}
						defaultValue={currentEnvironmentValue}
						onChange={onEnvironmentValueChange}
					/>
					<BadgeFixed
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
