import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';
import { BadgeCheckboxes } from '../components/Badges/BadgeCheckboxes/BadgeCheckboxes.component';
import { BadgeNumber } from '../components/Badges/BadgeNumber/BadgeNumber.component';

const standardBadgeTypeNames = {
	text: 'text',
	checkbox: 'checkbox',
	number: 'number',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
	[standardBadgeTypeNames.checkbox]: BadgeCheckboxes,
	[standardBadgeTypeNames.number]: BadgeNumber,
};

const createBadgesDict = badges => {
	if (badges) {
		return { ...standardBadges, ...badges };
	}
	return standardBadges;
};

const getBadgesFromDict = (badges, badgeKey) => badges[badgeKey];

export { createBadgesDict, getBadgesFromDict };
