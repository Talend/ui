const operatorNames = {
	contains: 'contains',
	equal: 'equal',
	notEqual: 'notEqual',
	in: 'in',
	greaterThan: 'greaterThan',
	greaterThanOrEqual: 'greaterThanOrEqual',
	lessThan: 'lessThan',
	lessThanOrEqual: 'lessThanOrEqual',
};

const standardOperators = t => ({
	[operatorNames.notEqual]: {
		label: t('OPERATOR_NOT_EQUALS_LABEL', {
			defaultValue: 'Not equals',
		}),
		name: 'notEquals',
		iconName: 'not-equal',
	},
	[operatorNames.equal]: {
		label: t('OPERATOR_EQUALS_LABEL', {
			defaultValue: 'Equals',
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
	[operatorNames.greaterThanOrEqual]: {
		label: t('OPERATOR_GREATER_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Greater than or equal',
		}),
		name: 'greaterThanOrEqual',
		iconName: 'greater-than-equal',
	},
	[operatorNames.lessThan]: {
		label: t('OPERATOR_LESS_THAN_LABEL', {
			defaultValue: 'Less than',
		}),
		name: 'lessThan',
		iconName: 'less-than',
	},
	[operatorNames.lessThanOrEqual]: {
		label: t('OPERATOR_LESS_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Less than or equal',
		}),
		name: 'lessThanOrEqual',
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
	operatorsKeys.map(operatorKey => operatorsDictionary[operatorKey]);

// eslint-disable-next-line import/prefer-default-export
export { createOperatorsDict, getOperatorsFromDict };
