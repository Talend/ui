import { PENDO_TAGS } from '../constants';

export const getApplyDataFeature = label => {
	const formatedLabel = label.toLowerCase().replace(' ', '_');
	return PENDO_TAGS.BADGE_ADD.replace('#{badgeName}', formatedLabel);
};
