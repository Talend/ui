import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';
import { BadgeCheckboxes } from '../components/Badges/BadgeCheckboxes/BadgeCheckboxes.component';
import { BadgeNumber } from '../components/Badges/BadgeNumber/BadgeNumber.component';
import { BadgeSlider } from '../components/Badges/BadgeSlider/BadgeSlider.component';
import { BadgeTags } from '../components/Badges/BadgeTags/BadgeTags.component';

const standardBadgeTypeNames = {
	text: 'text',
	checkbox: 'checkbox',
	number: 'number',
	slider: 'slider',
	tags: 'tags',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
	[standardBadgeTypeNames.checkbox]: BadgeCheckboxes,
	[standardBadgeTypeNames.number]: BadgeNumber,
	[standardBadgeTypeNames.slider]: BadgeSlider,
	[standardBadgeTypeNames.tags]: BadgeTags,
};

export const filterBadgeDefinitionsWithDictionary = (badgesDictionary, badgeDefinition) => {
	const supportedTypes = Object.keys(badgesDictionary);
	return badgeDefinition.filter(badge => supportedTypes.includes(badge.properties.type));
};

const createBadgesDict = badges => {
	if (badges) {
		return { ...standardBadges, ...badges };
	}
	return standardBadges;
};

const getBadgesFromDict = (badges, badgeKey) => badges[badgeKey];

export { createBadgesDict, getBadgesFromDict, standardBadgeTypeNames };
