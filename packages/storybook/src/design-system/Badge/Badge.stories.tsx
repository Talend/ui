import {
	Badge,
	BadgeDropdown,
	BadgePopover,
	BadgeTag,
	BadgeValue,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';
import React from 'react';

export default {
	component: Badge,
};

export const StoryBadgeValue = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Writable
			<BadgeValue name="Wonderful" value="Feature" />
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Read-only
			<BadgeValue isReadOnly name="Wonderful" value="Feature" />
		</StackHorizontal>
	</StackVertical>
);

export const StoryBadgeTag = () => <BadgeTag name="Delightful" />;

export const StoryBadgeDropdown = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Writable
			<BadgeDropdown
				name="Awesome"
				selectedId="3"
				value={[
					{ id: '1', label: 'Feature' },
					{ id: '2', label: 'Item' },
					{ id: '3', label: 'Component' },
				]}
			/>
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Read-only
			<BadgeDropdown
				isReadOnly
				name="Awesome"
				selectedId="3"
				value={[
					{ id: '1', label: 'Feature' },
					{ id: '2', label: 'Item' },
					{ id: '3', label: 'Component' },
				]}
			/>
		</StackHorizontal>
	</StackVertical>
);

export const StoryBadgePopover = () => (
	<StackVertical gap="S" justify="spaceBetween">
		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Writable
			<BadgePopover
				name="Marvellous"
				value={[
					{ id: '1', label: 'Feature', onClick: () => {} },
					{ id: '2', label: 'Item', onClick: () => {} },
					{ id: '3', label: 'Component', onClick: () => {} },
				]}
			/>
		</StackHorizontal>

		<StackHorizontal align="center" gap="S" justify="spaceBetween">
			Read-only
			<BadgePopover
				isReadOnly
				name="Marvellous"
				value={[
					{ id: '1', label: 'Feature', onClick: () => {} },
					{ id: '2', label: 'Item', onClick: () => {} },
					{ id: '3', label: 'Component', onClick: () => {} },
				]}
			/>
		</StackHorizontal>
	</StackVertical>
);
