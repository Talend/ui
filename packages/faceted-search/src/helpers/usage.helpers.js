import { USAGE_TRACKING_TAGS } from '../constants';
import { pick } from 'lodash';

export const getApplyDataFeature = feature => {
	const formatedFeature = feature.toLowerCase().replace(' ', '_');
	return USAGE_TRACKING_TAGS.BADGE_ADD.replace('#{badgeName}', formatedFeature);
};

export const getDataAttributesFrom = props => {
	const dataAttributesKeys = Object.keys(props).filter(objectKey => objectKey.startsWith('data-'));
	return pick(props, dataAttributesKeys);
};
