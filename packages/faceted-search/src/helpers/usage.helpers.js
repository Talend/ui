import { USAGE_TRACKING_TAGS } from '../constants';

export const getApplyDataFeature = label => {
	const formatedLabel = label.toLowerCase().replace(' ', '_');
	return USAGE_TRACKING_TAGS.BADGE_ADD.replace('#{badgeName}', formatedLabel);
};
