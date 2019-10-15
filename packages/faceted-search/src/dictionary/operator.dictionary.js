const operatorNames = {
	contains: 'contains',
	equal: '=',
	notEqual: 'notEqual',
};

const standardOperators = t => ({
	[operatorNames.notEqual]: {
		label: t('OPERATOR_NOT_EQUALS_LABEL', {
			defaultValue: 'Not equals',
		}),
		name: 'notEqual',
		iconName: 'not-equal',
	},
	[operatorNames.equal]: {
		label: t('OPERATOR_EQUALS_LABEL', {
			defaultValue: 'Equals',
		}),
		name: '=',
		iconName: 'equal',
	},
	[operatorNames.contains]: {
		label: t('OPERATOR_CONTAINS_LABEL', {
			defaultValue: 'Contains',
		}),
		name: 'contains',
		iconName: 'contains',
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
