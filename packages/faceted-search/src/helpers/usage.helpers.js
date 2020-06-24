import { USAGE_TRACKING_TAGS } from '../constants';

export const getApplyDataFeature = feature => {
	const formatedFeature = feature.toLowerCase().replace(' ', '_');
	return USAGE_TRACKING_TAGS.BADGE_ADD.replace('#{badgeName}', formatedFeature);
};
