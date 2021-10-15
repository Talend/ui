import { operatorNames } from './operator.dictionary';

export const removeOneOperator = (badgeDefinition, operatorToRemove) => {
	const {
		metadata: { operators },
	} = badgeDefinition;

	return {
		...badgeDefinition,
		metadata: {
			...badgeDefinition.metadata,
			operators: operators.filter(operator => operator !== operatorToRemove),
		},
	};
};

export const filterBadgesDefinitionsWithOneContains = badgesDefinitions =>
	badgesDefinitions.map(badgeDefinition => {
		const {
			properties: { type },
			metadata: { operators },
		} = badgeDefinition;

		const hasTwoContainsOperator =
			type === 'text' &&
			operators.includes(operatorNames.contains) &&
			operators.includes(operatorNames.containsIgnoreCase);

		if (hasTwoContainsOperator) {
			return removeOneOperator(badgeDefinition, operatorNames.contains);
		}

		return badgeDefinition;
	});

export default { filterBadgesDefinitionsWithOneContains, removeOneOperator };
