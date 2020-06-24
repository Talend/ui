import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import get from 'lodash/get';

const findByMetadataBadgeId = badgeId => ({ metadata }) => get(metadata, 'badgeId') === badgeId;

const getBadgeIndexFromId = badgeId => badges => badges.findIndex(findByMetadataBadgeId(badgeId));

const getBadge = index => badges => badges[index];

const setBadgeValue = ({ properties, metadata }) => badge => ({
	properties: {
		...badge.properties,
		...properties,
	},
	metadata: {
		...badge.metadata,
		...metadata,
	},
});

const setBadge = (newProperties, newMetadata) => getIndexFn => badges => {
	const index = getIndexFn(badges);
	if (index >= 0) {
		const newBadge = setBadgeValue({ properties: newProperties, metadata: newMetadata })(
			getBadge(index)(badges),
		);
		// eslint-disable-next-line no-param-reassign
		badges[index] = newBadge;
	}
	return badges;
};
const spliceBadge = getIndexFn => badges => {
	const index = getIndexFn(badges);
	if (index >= 0) {
		badges.splice(index, 1);
	}
	return badges;
};

const pushBadge = badge => badges => {
	badges.push(badge);
	return badges;
};

export const applyBadgeTransform = transformFn => badges => {
	const clonedBadges = cloneDeep(badges);
	return transformFn(clonedBadges).map(Object.freeze);
};

export const updateBadge = (badgeId, newProperties, newMetadata) =>
	applyBadgeTransform(flow([getBadgeIndexFromId, setBadge(newProperties, newMetadata)])(badgeId));

export const deleteBadge = badgeId =>
	applyBadgeTransform(flow([getBadgeIndexFromId, spliceBadge])(badgeId));

export const createBadge = badge =>
	applyBadgeTransform(
		pushBadge({
			...badge,
			metadata: {
				...badge.metadata,
				isInCreation: true,
			},
		}),
	);

export const closeInitOpenedBadge = badgeId =>
	updateBadge(badgeId, {
		initialOperatorOpened: false,
		initialValueOpened: false,
	});
