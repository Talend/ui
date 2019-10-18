import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';
import { BadgeSelect } from '../components/Badges/BadgeSelect/BadgeSelect.component';

const standardBadgeTypeNames = {
	text: 'text',
	select: 'select',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
	[standardBadgeTypeNames.select]: BadgeSelect,
};

const createBadgesDict = badges => {
	if (badges) {
		return { ...standardBadges, ...badges };
	}
	return standardBadges;
};

const getBadgesFromDict = (badges, badgeKey) => badges[badgeKey];

export { createBadgesDict, getBadgesFromDict };
