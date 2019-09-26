import i18n from '../../../i18n';

const operatorNames = {
	contains: 'contains',
	equal: '=',
	notEqual: 'notEqual',
};

const standardOperators = {
	[operatorNames.notEqual]: {
		label: i18n.t('OPERATOR_NOT_EQUALS_LABEL', { defaultValue: 'Not equals' }),
		name: 'notEqual',
		iconName: 'not-equal',
	},
	[operatorNames.equal]: {
		label: i18n.t('OPERATOR_EQUALS_LABEL', { defaultValue: 'Equals' }),
		name: '=',
		iconName: 'equal',
	},
	[operatorNames.contains]: {
		label: i18n.t('OPERATOR_CONTAINS_LABEL', { defaultValue: 'Contains' }),
		name: 'contains',
		iconName: 'contains',
	},
};

const operatorsDictionary = items => {
	let dictionary = items;
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

const { addOperatorToDict, getOperatorsFromDict } = operatorsDictionary(standardOperators);

export { addOperatorToDict, getOperatorsFromDict };
