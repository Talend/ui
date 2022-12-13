import { Badge, BadgeDropdown, BadgePopover, BadgeTag, BadgeValue } from '@talend/design-system';
import React from 'react';

export default {
	component: Badge,
};

export const StoryBadgeValue = () => <BadgeValue name="Feature" value="Wonderful" />;

export const StoryBadgeTag = () => <BadgeTag name="Delightful" />;

export const StoryBadgeDropdown = () => (
	<BadgeDropdown
		name="Feature"
		value={[
			{ type: 'title', label: 'Awesome' },
			{ type: 'title', label: 'Delightful' },
			{ type: 'title', label: 'Marvellous' },
			{ type: 'title', label: 'Wonderful' },
		]}
	/>
);

export const StoryBadgePopover = () => <BadgePopover name="Marvellous" />;
