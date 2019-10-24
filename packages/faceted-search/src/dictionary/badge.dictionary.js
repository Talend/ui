import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';
import { BadgeCheckboxes } from '../components/Badges/BadgeCheckboxes/BadgeCheckboxes.component';

const standardBadgeTypeNames = {
	text: 'text',
	checkbox: 'checkbox',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
	[standardBadgeTypeNames.checkbox]: BadgeCheckboxes,
};

const createBadgesDict = badges => {
	if (badges) {
		return { ...standardBadges, ...badges };
	}
	return standardBadges;
};

const getBadgesFromDict = (badges, badgeKey) => badges[badgeKey];

export { createBadgesDict, getBadgesFromDict };
