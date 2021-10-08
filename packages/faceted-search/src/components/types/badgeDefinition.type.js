import get from 'lodash/get';
import uuid from 'uuid';
import flow from 'lodash/flow';

const getAttribute = badgeDefinitionRaw => get(badgeDefinitionRaw, 'attribute');
const createBadgeId = attribute => `${attribute}-${uuid.v4()}`;
const getOperators = badgeDefinitionRaw => get(badgeDefinitionRaw, 'operators');
const getType = badgeDefinitionRaw => get(badgeDefinitionRaw, 'type');
const getLabel = badgeDefinitionRaw => get(badgeDefinitionRaw, 'label');

const facetedBadgeDefinitionStruct = {
	properties: {
		attribute: name,
		initialOpenedOperator: false,
		initialOpenedValue: false,
		label: '',
		operator: {},
		operators: [],
		type: '',
	},
	metadata: {
		badgeId: '',
		badgesPerFacet: 1,
		entitiesPerBadge: 'N',
	},
};

const fromRaw = badgeDefinitionRaw => {
	const newStruct = Object.create(facetedBadgeDefinitionStruct);
	const name = getAttribute(badgeDefinitionRaw);
	newStruct.properties = {
		attribute: name,
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: getLabel(badgeDefinitionRaw),
		operator: {},
		operators: [],
		type: getType(badgeDefinitionRaw),
	};
	newStruct.metadata = {
		...badgeDefinitionRaw.metadata,
		operators: getOperators(badgeDefinitionRaw),
	};
	return newStruct;
};

export const addOperatorsProps = operators => badge => ({
	...badge,
	properties: {
		...badge.properties,
		operator: Array.isArray(operators) && operators[0],
		operators: Array.isArray(operators) && operators,
	},
});

export const generateUniqueBadgeId = badge => ({
	...badge,
	metadata: {
		...badge.metadata,
		badgeId: createBadgeId(badge.properties.attribute),
	},
});

export const createFacetedBadgeDefinition = badgeDefinitionRaw => {
	if (badgeDefinitionRaw) {
		return fromRaw(badgeDefinitionRaw);
	}
	return Object.create(facetedBadgeDefinitionStruct);
};

export const generateBadge = operators =>
	flow([generateUniqueBadgeId, addOperatorsProps(operators)]);
