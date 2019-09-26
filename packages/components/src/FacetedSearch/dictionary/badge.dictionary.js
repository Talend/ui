import { BadgeText } from '../components/Badges/BadgeText/BadgeText.component';

const standardBadgeTypeNames = {
	text: 'text',
};

const standardBadgeType = {
	[standardBadgeTypeNames.text]: BadgeText,
};

const badgeTypeDictionary = items => {
	let dictionary = items;
	const addBadgeTypeToDict = newBadgeType => {
		dictionary = {
			...dictionary,
			newBadgeType,
		};
	};
	const getBadgeTypeFromDict = badgeTypeKey => dictionary[badgeTypeKey];
	return { addBadgeTypeToDict, getBadgeTypeFromDict };
};

const { addBadgeTypeToDict, getBadgeTypeFromDict } = badgeTypeDictionary(standardBadgeType);
export { addBadgeTypeToDict, getBadgeTypeFromDict };
