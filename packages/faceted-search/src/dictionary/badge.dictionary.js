import { BadgeCheckboxes } from '../components/Badges/BadgeCheckboxes/BadgeCheckboxes.component';
import { BadgeDate } from '../components/Badges/BadgeDate/BadgeDate.component';
import { BadgeMenu } from '../components/Badges/BadgeMenu/BadgeMenu.component';
import { BadgeNumber } from '../components/Badges/BadgeNumber/BadgeNumber.component';
import { BadgePeriod } from '../components/Badges/BadgePeriod/BadgePeriod.component';
import { BadgeSlider } from '../components/Badges/BadgeSlider/BadgeSlider.component';
import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';

const standardBadgeTypeNames = {
	text: 'text',
	checkbox: 'checkbox',
	number: 'number',
	slider: 'slider',
	tags: 'tags',
	date: 'date',
	menu: 'menu',
	period: 'period',
};

const standardBadges = {
	[standardBadgeTypeNames.text]: BadgeText,
	[standardBadgeTypeNames.checkbox]: BadgeCheckboxes,
	[standardBadgeTypeNames.number]: BadgeNumber,
	[standardBadgeTypeNames.slider]: BadgeSlider,
	[standardBadgeTypeNames.tags]: BadgeCheckboxes,
	[standardBadgeTypeNames.date]: BadgeDate,
	[standardBadgeTypeNames.menu]: BadgeMenu,
	[standardBadgeTypeNames.period]: BadgePeriod,
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
