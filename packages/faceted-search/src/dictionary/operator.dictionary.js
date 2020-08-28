import { Badge } from '@talend/react-components/lib';

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

const standardOperators = (t, useColors) => ({
	[operatorNames.notEquals]: {
		label: t('OPERATOR_NOT_EQUALS_LABEL', {
			defaultValue: 'Not equal to',
		}),
		name: 'notEquals',
		iconName: 'not-equal',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.equals]: {
		label: t('OPERATOR_EQUALS_LABEL', {
			defaultValue: 'Equal to',
		}),
		name: 'equals',
		iconName: 'equal',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.contains]: {
		label: t('OPERATOR_CONTAINS_LABEL', {
			defaultValue: 'Contains',
		}),
		name: 'contains',
		iconName: 'contains',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.containsIgnoreCase]: {
		label: t('OPERATOR_CONTAINS_LABEL', {
			defaultValue: 'Contains',
		}),
		name: 'containsIgnoreCase',
		iconName: 'contains',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.in]: {
		label: t('OPERATOR_IN_LABEL', {
			defaultValue: 'In',
		}),
		name: 'in',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.greaterThan]: {
		label: t('OPERATOR_GREATER_THAN_LABEL', {
			defaultValue: 'Greater than',
		}),
		name: 'greaterThan',
		iconName: 'greater-than',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.greaterThanOrEquals]: {
		label: t('OPERATOR_GREATER_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Greater than or equal to',
		}),
		name: 'greaterThanOrEquals',
		iconName: 'greater-than-equal',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.lessThan]: {
		label: t('OPERATOR_LESS_THAN_LABEL', {
			defaultValue: 'Less than',
		}),
		name: 'lessThan',
		iconName: 'less-than',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
	[operatorNames.lessThanOrEquals]: {
		label: t('OPERATOR_LESS_THAN_OR_EQUAL_LABEL', {
			defaultValue: 'Less than or equal to',
		}),
		name: 'lessThanOrEquals',
		iconName: 'less-than-equal',
		color: useColors ? Badge.COLORS.VALUE_FILTER : undefined,
	},
});

const createOperatorsDict = (t, operators, useColors) => {
	if (operators) {
		return {
			...standardOperators(t, useColors),
			...operators,
		};
	}
	return standardOperators(t, useColors);
};
const getOperatorsFromDict = (operatorsDictionary, operatorsKeys) =>
	operatorsKeys
		.map(operatorKey => operatorsDictionary[operatorKey])
		.filter(element => element !== undefined);

// eslint-disable-next-line import/prefer-default-export
export { operatorNames, createOperatorsDict, getOperatorsFromDict };
