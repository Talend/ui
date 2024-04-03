import { useState } from 'react';

import {
	Badge,
	BadgeDropdown,
	BadgePopover,
	BadgeProps,
	BadgeTag,
	BadgeValue,
	StackHorizontal,
	StackVertical,
} from '../../';
import Checkbox from '../../components/Form/Field/Input/Input.Checkbox';

export default {
	component: Badge,
	title: 'Messaging/Badge',
};

export const Overview = (props: BadgeProps) => <Badge {...props} />;
Overview.args = {
	label: 'Badge',
	value: ['Feature'],
	semantic: 'none',
};
Overview.argTypes = {
	label: { control: { type: 'text' } },
	value: { control: { type: 'text' } },
	variant: {
		control: { type: 'select' },
		options: ['badge', 'tag', 'dropdown', 'popover'],
	},
};

const items = [
	{ id: '1', label: 'Feature' },
	{ id: '2', label: 'Item' },
	{ id: '3', label: 'Component' },
];

export const StoryBadgeValue = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Component Badge w/ variant "badge"
			<Badge label="Wonderful" value={['Feature']} variant="badge" />
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Variant component BadgeValue
			<BadgeValue label="Wonderful" value={['Feature']} />
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Variant component BadgeValue w/ multi value
			<BadgeValue label="Wonderful" value={['Feature', 'Item', 'Component']} />
		</StackHorizontal>
	</StackVertical>
);

export const StoryBadgeTag = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Component Badge w/ variant "tag"
			<Badge label="Delightful" variant="tag" />
		</StackHorizontal>

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
				Component Badge w/ variant "dropdown"
				<Badge
					label="Awesome"
					selectedId={selectedValue}
					value={items}
					onChange={setSelectedValue}
					variant="dropdown"
				/>
			</StackHorizontal>

			<StackHorizontal align="center" gap="S" justify="spaceBetween">
				Variant component BadgeDropdown
				<BadgeDropdown
					label="Awesome"
					selectedId={selectedValue}
					value={items}
					onChange={setSelectedValue}
				/>
			</StackHorizontal>
		</StackVertical>
	);
};

export const StoryBadgePopover = () => {
	return (
		<StackVertical gap="S" justify="spaceBetween">
			<StackHorizontal align="center" gap="S" justify="spaceBetween">
				Component Badge w/ variant "popover"
				<Badge label="Marvellous" value={items} variant="popover">
					<div>Some content with very loooooooooooooooooooooong text</div>
				</Badge>
			</StackHorizontal>

			<StackHorizontal align="center" gap="S" justify="spaceBetween">
				Variant component BadgePopover
				<BadgePopover label="Marvellous" value={items}>
					{items.map(item => (
						<Checkbox key={`checkbox-${item.id}`} label={item.label} name={item.id} />
					))}
				</BadgePopover>
			</StackHorizontal>
		</StackVertical>
	);
};
