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

const operatorsDictionary = (t, items) => {
	let dictionary = { ...standardOperators(t), ...items };
	const addOperatorToDict = newOperator => {
		dictionary = {
			...dictionary,
			newOperator,
		};
	};
	const getOperatorsFromDict = operatorsKeys =>
		operatorsKeys.map(operatorKey => dictionary[operatorKey]);
	return { addOperatorToDict, getOperatorsFromDict };
};

// eslint-disable-next-line import/prefer-default-export
export { operatorsDictionary };
