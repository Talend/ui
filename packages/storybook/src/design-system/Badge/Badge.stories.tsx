import {
	Badge,
	BadgeDropdown,
	BadgePopover,
	BadgeTag,
	BadgeValue,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';
import { useState } from 'react';

export default {
	component: Badge,
};

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
					value={[
						{ id: '1', label: 'Feature' },
						{ id: '2', label: 'Item' },
						{ id: '3', label: 'Component' },
					]}
					onChange={setSelectedValue}
					variant="dropdown"
				/>
			</StackHorizontal>

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
			Component Badge w/ variant "popover"
			<Badge
				label="Marvellous"
				value={[
					{ id: '1', label: 'Feature', onClick: () => {} },
					{ id: '2', label: 'Item', onClick: () => {} },
					{ id: '3', label: 'Component', onClick: () => {} },
				]}
				variant="popover"
			/>
		</StackHorizontal>

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
