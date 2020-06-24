const operatorNames = {
	contains: 'contains',
	containsIgnoreCase: 'containsIgnoreCase',
	equals: 'equals',
	notEquals: 'notEquals',
	in: 'in',
	greaterThan: 'greaterThan',
	greaterThanOrEquals: 'greaterThanOrEquals',
	lessThan: 'lessThan',
	lessThanOrEquals: 'lessThanOrEquals',
};

const standardOperators = t => ({
	[operatorNames.notEquals]: {
		label: t('OPERATOR_NOT_EQUALS_LABEL', {
			defaultValue: 'Not equal to',
		}),
		name: 'notEquals',
		iconName: 'not-equal',
	},
	[operatorNames.equals]: {
		label: t('OPERATOR_EQUALS_LABEL', {
			defaultValue: 'Equal to',
		}),
		name: 'equals',
		iconName: 'equal',
	},
	[operatorNames.contains]: {
		label: t('OPERATOR_CONTAINS_LABEL', {
			defaultValue: 'Contains',
		}),
		name: 'contains',
		iconName: 'contains',
	},
	[operatorNames.containsIgnoreCase]: {
		label: t('OPERATOR_CONTAINS_LABEL', {
			defaultValue: 'Contains',
		}),
		name: 'containsIgnoreCase',
		iconName: 'contains',
	},
	[operatorNames.in]: {
		label: t('OPERATOR_IN_LABEL', {
			defaultValue: 'In',
		}),
		name: 'in',
	},
	[operatorNames.greaterThan]: {
		label: t('OPERATOR_GREATER_THAN_LABEL', {
			defaultValue: 'Greater than',
		}),
		name: 'greaterThan',
		iconName: 'greater-than',
	},
	[operatorNames.greaterThanOrEquals]: {
		label: t('OPERATOR_GREATER_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Greater than or equal to',
		}),
		name: 'greaterThanOrEquals',
		iconName: 'greater-than-equal',
	},
	[operatorNames.lessThan]: {
		label: t('OPERATOR_LESS_THAN_LABEL', {
			defaultValue: 'Less than',
		}),
		name: 'lessThan',
		iconName: 'less-than',
	},
	[operatorNames.lessThanOrEquals]: {
		label: t('OPERATOR_LESS_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Less than or equal to',
		}),
		name: 'lessThanOrEquals',
		iconName: 'less-than-equal',
	},
});

const createOperatorsDict = (t, operators) => {
	if (operators) {
		return {
			...standardOperators(t),
			...operators,
		};
	}
	return standardOperators(t);
};
const getOperatorsFromDict = (operatorsDictionary, operatorsKeys) =>
	operatorsKeys
		.map(operatorKey => operatorsDictionary[operatorKey])
		.filter(element => element !== undefined);

// eslint-disable-next-line import/prefer-default-export
export { operatorNames, createOperatorsDict, getOperatorsFromDict };
