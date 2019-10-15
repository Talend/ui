import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';

const standardBadgeTypeNames = {
	text: 'text',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
};

const createBadgesDict = badges => {
	if (badges) {
		return { ...standardBadges, ...badges };
	}
	return standardBadges;
};

const getBadgesFromDict = (badges, badgeKey) => badges[badgeKey];

export { createBadgesDict, getBadgesFromDict };
