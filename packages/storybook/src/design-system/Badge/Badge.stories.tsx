import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

import {
	Badge,
	BadgeDropdown,
	BadgePopover,
	BadgeTag,
	BadgeValue,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

export default {
	component: Badge,
};

export const StoryBadgeValue = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			BadgeValue with only one value
			<BadgeValue label="Runs on" value={['Remote Engine']} />
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			BadgeValue with multiple values
			<BadgeValue
				label="Runs on"
				value={['Cloud Engine', 'Remote Engine', 'Cloud components']}
				semanticIcon="valid"
			/>
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			BadgeValue with close button
			<BadgeValue
				semanticIcon="invalid"
				label="Runs on"
				value={['Cloud Engine', 'Remote Engine', 'Cloud components']}
				onClose={() => action('onClose')}
			/>
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			BadgeValue with operators
			<BadgeValue
				semanticIcon="invalid"
				label="Trust score"
				value={['3']}
				operators={{
					list: [
						{ label: 'Less than', icon: 'less-than' },
						{ label: 'Greater than', icon: 'greater-than' },
						{ label: 'Equal to', icon: 'equal' },
					],
					onChange: action('onOperatorChange'),
				}}
				onClose={() => action('onClose')}
			/>
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			BadgeValue with a selected operator
			<BadgeValue
				label="Trust score"
				value={['4']}
				operators={{
					list: [
						{ label: 'Less than', icon: 'less-than' },
						{ label: 'Greater than', icon: 'greater-than' },
						{ label: 'Equal to', icon: 'equal' },
					],
					selected: { label: 'Greater than', icon: 'greater-than' },
					onChange: action('onOperatorChange'),
				}}
				onClose={() => action('onClose')}
			/>
		</StackHorizontal>
	</StackVertical>
);

export const StoryBadgeValueTemplate: ComponentStory<typeof BadgeValue> = args => {
	return <BadgeValue {...args} />;
};

export const StoryBadgeValueTemplateStory = StoryBadgeValueTemplate.bind({});
StoryBadgeValueTemplateStory.argTypes = {
	label: {
		control: { type: 'text' },
		description: 'Set badge label',
		type: { name: 'string', required: true },
		defaultValue: 'Runs on',
	},
	closeButtonLabel: {
		control: { type: 'text' },
		description: 'Set close button label',
		type: { name: 'string', required: false },
		defaultValue: 'Close',
	},
	onClose: {
		control: { type: 'function' },
		description: 'Callback when close button is clicked',
		type: { name: 'function', required: false },
		defaultValue: () => action('onClose'),
	},
	value: {
		control: { type: 'array' },
		description: 'Value to display on the right side of the badge',
		type: { name: 'string', required: true },
		defaultValue: ['Cloud Engine', 'Remote Engine'],
	},
	semanticIcon: {
		control: { type: 'select' },
		description: 'Semantic icon to display on the left side of the badge',
		type: { name: 'string', required: false },
		defaultValue: 'valid',
		options: ['valid', 'invalid', 'none'],
	},
	operators: {
		control: { type: 'object' },
		description: 'Operators to display on the left side of the badge',
		defaultValue: {
			list: [
				{ label: 'Less than', icon: 'less-than' },
				{ label: 'Greater than', icon: 'greater-than' },
				{ label: 'Equal to', icon: 'equal' },
			],
			onChange: action('onOperatorChange'),
		},
	},
};

export const StoryBadgeTag = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Variant component BadgeTag
			<BadgeTag label="Delightful" />
		</StackHorizontal>
	</StackVertical>
);

export const StoryBadgeDropdown = () => {
	const [selectedValue, setSelectedValue] = useState('3');

	return (
		<StackVertical gap="S" justify="spaceBetween">
			<StackHorizontal align="center" gap="S" justify="spaceBetween">
				Variant component BadgeDropdown
				<BadgeDropdown
					label="Awesome"
					selectedId={selectedValue}
					value={[
						{ id: '1', label: 'Feature' },
						{ id: '2', label: 'Item' },
						{ id: '3', label: 'Component' },
					]}
					onChange={setSelectedValue}
				/>
			</StackHorizontal>
		</StackVertical>
	);
};

export const StoryBadgePopover = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Variant component BadgePopover
			<BadgePopover
				label="Marvellous"
				value={[
					{ id: '1', label: 'Feature', onClick: () => {} },
					{ id: '2', label: 'Item', onClick: () => {} },
					{ id: '3', label: 'Component', onClick: () => {} },
				]}
			/>
		</StackHorizontal>
	</StackVertical>
);
